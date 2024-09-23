from fastapi import FastAPI, HTTPException
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Hàm kết nối đến MySQL và lấy dữ liệu sản phẩm
def get_products_from_db():
    db_connection = mysql.connector.connect(
        host="localhost",      # Địa chỉ host
        user="root",           # Tên người dùng
        password="123456",   # Mật khẩu
        database="webnongsan"  # Tên database
    )

    cursor = db_connection.cursor(dictionary=True)
    # query = "SELECT id, product_name, price, unit, description, category_id FROM products"
    query = "SELECT * FROM products"
    cursor.execute(query)
    products = cursor.fetchall()
    cursor.close()
    db_connection.close()
    #print(products)
    return products

# Hàm tính khoảng cách tương tự giữa sản phẩm
def calculate_distance(product, current_product, price_weight=0.4, category_weight=0.2, description_weight=0.2, name_weight=0.2):
    if product['id'] == current_product['id']:
        return float('inf')  # Loại bỏ sản phẩm hiện tại
    
    # Khoảng cách giá
    price_distance = abs(product['price'] - current_product['price'])
    
    # Phân loại
    category_distance = 0 if product['category_id'] == current_product['category_id'] else 1
    
    # Mô tả và tên
    description_index = products.index(product)
    current_description_index = products.index(current_product)
    description_distance = 1 - cosine_sim_desc[description_index, current_description_index]
    name_distance = 1 - cosine_sim_name[description_index, current_description_index]
    
    # Tổng khoảng cách
    return (price_weight * price_distance +
            category_weight * category_distance +
            description_weight * description_distance +
            name_weight * name_distance)


@app.get("/similar-products/{product_id}")
def get_similar_products(product_id: int):
    # Lấy dữ liệu sản phẩm từ MySQL
    global products
    products = get_products_from_db()

    # Kiểm tra sản phẩm có tồn tại không
    current_product = next((product for product in products if product['id'] == product_id), None)
    if not current_product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Chuẩn hóa giá trị giá
    prices = np.array([p['price'] for p in products])
    normalized_prices = (prices - prices.min()) / (prices.max() - prices.min())

    # Vector hóa tên và mô tả
    descriptions = [p['description'] if p['description'] is not None else '' for p in products]
    names = [p['product_name'] if p['product_name'] is not None else '' for p in products]

    vectorizer_desc = TfidfVectorizer()
    vectorizer_name = TfidfVectorizer()

    description_vectors = vectorizer_desc.fit_transform(descriptions)
    name_vectors = vectorizer_name.fit_transform(names)

    # Tính cosine similarity cho mô tả và tên
    global cosine_sim_desc, cosine_sim_name
    cosine_sim_desc = cosine_similarity(description_vectors)
    cosine_sim_name = cosine_similarity(name_vectors)

    # Tính toán khoảng cách và chọn 10 sản phẩm tương tự nhất
    distances = [(product, calculate_distance(product, current_product)) for product in products]
    filtered_distances = [item for item in distances if item[1] != float('inf')]
    top_6_similar_products = sorted(filtered_distances, key=lambda x: x[1])[:6]

    # Gộp phản hồi gồm mã trạng thái và dữ liệu
    response_data = {
        "status_code": 200,
        "data": [{"id": product['id'], "product_name": product['product_name'], "distance": distance, "price": product['price'], "rating": product['rating']} for product, distance in top_6_similar_products]
    }

    return JSONResponse(status_code=200, content=response_data)