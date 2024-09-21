import React, { useState, useEffect } from "react";
import { Product } from ".";
import { apiGetProducts } from "../apis";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);

  const fetchProduct = async () => {
    const response = await apiGetProducts({ page: 1, size: 6, sort: 'rating,desc'});
    if (response.statusCode === 200) {
      setProducts(response.data.result)
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);


  return (
    <div className="w-main">
      <h2 className="text-[20px] uppercase font-semibold py-[10px] border-b-4 border-main">
        Sản phẩm nổi bật
      </h2>

      <div className="grid grid-cols-6 gap-4 mt-4">
        {products?.map((e) => (
          <Product key={e.id} productData={e} />
        ))}
      </div>

      <div className="flex justify-between mt-[40px]">
        <img
          src="https://free.vector6.com/wp-content/uploads/2020/04/0425-Vector-Hoa-Qua-ourckq010.jpg"
          alt=""
          className="w-[60%] object-contain"
        />
        <img
          className="w-[40%] object-contain"
          src="https://free.vector6.com/wp-content/uploads/2020/04/0425-Vector-Hoa-Qua-ourckq031.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default FeatureProduct;
