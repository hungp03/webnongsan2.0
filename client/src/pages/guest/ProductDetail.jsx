import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetRecommendedProducts } from '../../apis';
import { Breadcrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInfomation, ProductCard } from '../../components';
import { formatMoney, renderStarFromNumber } from '../../utils/helper'
import product_default from '../../assets/product_default.png'
import { productExtraInfo } from '../../utils/constants';

const ProductDetail = () => {
  const { pid, productname, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState(null)
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    //console.log(response)
    if (response.statusCode === 200)
      setProduct(response.data)
  }

  const fetchRecommended = async () => {
    const res = await apiGetRecommendedProducts(pid);
    if (res.status_code === 200) {
      setRecommendedProducts(res.data)
    }
  }

  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchRecommended()
    }
  }, [pid])

  // const handleQuantity = useCallback((x) => {
  //   if (!Number(x) || Number(x) < 1) {
  //     return
  //   }
  //   else setQuantity(x)
  // }, [quantity])

  const handleButtonQuantity = useCallback((flag) => {
    if (flag === 'minus') {
      if (quantity === 1) return
      setQuantity(prev => +prev - 1)
    }
    else if (flag === 'plus') {
      if (quantity === product?.quantity) return;
      setQuantity(prev => +prev + 1)
    }
  }, [quantity])

  return (
    <div className='w-full'>
      <div className='h-20 flex justify-center items-center bg-gray-100 '>
        <div className='w-main'>
          <h3 className='font-semibold'>{productname}</h3>
          <Breadcrumb title={productname} category={category} />
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex-4 flex flex-col gap-4 w-2/5'>
          <div className='w-[450px]'>
            <div className='px-2' >
              <img src={product?.imageUrl || product_default} alt='product' className='object-cover' />
            </div>
          </div>
        </div>
        <div className='w-2/5 flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-[30px] font-semibold'>{`${formatMoney(product?.price)}đ`}</h2>
            <span className='text-sm text-red-500 ml-2 mt-1 pr-2'>{`Có sẵn: ${product?.quantity}`}</span>
          </div>
          <div className='flex items-center'>
            {renderStarFromNumber(product?.rating)}
            <span className='text-sm text-red-500 ml-2 mt-1'>{`Đã bán ${product?.sold}`}</span>
          </div>
          <ul className="text-smtext-gray-500">
            {`Đơn vị: ${product?.unit || "Không"}`}
          </ul>
          <div className='flex flex-col gap-8'>
            {product?.quantity > 0 ?
              <>
                <div className='flex items-center gap-4'>
                  <span>Số lượng</span>
                  <SelectQuantity quantity={quantity} changeQuantity={handleButtonQuantity} />
                </div>
                <Button fw>Thêm vào giỏ hàng</Button>
              </> : <p className='text-red-500'>Sản phẩm đang tạm hết hàng, bạn vui lòng quay lại sau nhé</p>}
          </div>
        </div>
        <div className='flex-2 w-1/5 ml-4'>
          {productExtraInfo.map(e => (
            <ProductExtraInfoItem key={e.id} title={e.title} sub={e.sub} icon={e.icon} />
          ))}
        </div>
      </div>
      <div className='w-main m-auto mt-8'>
        <ProductInfomation des={product?.description} />
      </div>
      <div className='w-full flex justify-center'>
        <div className="w-main">
          <h2 className="text-[20px] uppercase font-semibold py-2 border-b-4 border-main">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-6 gap-4 mt-4 ">
            {recommendedProducts?.map((e) => (
              <ProductCard key={e.id} productData={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail