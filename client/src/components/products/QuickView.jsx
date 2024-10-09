import React from 'react'

const QuickView = ({product}) => {
  return (
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
        {product?.rating}
        {renderStarFromNumber(product?.rating)?.map((el, index) => (
          <span key={index}>{el}</span>
        ))}
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
  )
}

export default QuickView