import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetCurrentUser, apiGetProduct, apiGetRatings, apiGetRatingsPage, apiRatings, apiGetRecommendedProducts } from '../../apis';
import { Breadcrumb, Button, SelectQuantity, ProductExtraInfoItem, ProductInfomation, VoteOption,Comment, ProductCard } from '../../components';
import { formatMoney, renderStarFromNumber } from '../../utils/helper'
import product_default from '../../assets/product_default.png'
import { productExtraInfo } from '../../utils/constants';
import Votebar from '../../components/vote/Votebar';
import { useDispatch,useSelector } from 'react-redux';
import {showModal} from '../../store/app/appSlice'
import Swal from 'sweetalert2';
import path from '../../utils/path';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/paginate/Pagination';

const ProductDetail = () => {
  const { pid, productname, category } = useParams();
  const [product, setProduct] = useState(null);
  const [paginate, setPaginate] = useState(null)
  const [feedbacksPage,setFeedbacksPage] = useState(null)
  const [feedbacks,setFeedbacks] = useState(null)
  const [currentPage,setCurrentPage] = useState(1)
  const [update,setUpdate] = useState(false)
  const [uid, setUid] = useState(null)
  const {isLoggedIn} = useSelector(state=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const fetchFeedbacksPageData = async (page = 1)=>{
    const response = await apiGetRatingsPage(pid,{ page, size: 5 })
    if (response.statusCode === 200){
      setFeedbacksPage(response.data?.result)
      setPaginate(response.data?.meta)
      setCurrentPage(page)
    }

  }
  const fetchFeedbacksData = async ()=>{
    const response = await apiGetRatingsPage(pid,{ page: 1 })
    if (response.statusCode === 200)
      setFeedbacks(response.data?.result)
  }
  const fetchUserData = async ()=>{
    const response = await apiGetCurrentUser()
    if (response.statusCode == 200)
      setUid(response.data?.user?.id)
  }


  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchRecommended()
    }
  }, [pid])
  useEffect(() => {
    if (pid)
      fetchFeedbacksPageData(currentPage)
      fetchFeedbacksData()
  }, [pid,update])
  useEffect(() => {
    if (pid)
      fetchFeedbacksPageData(currentPage)
  }, [pid,currentPage])
  useEffect(()=>{
    fetchUserData()
  },[])


  // const handleQuantity = useCallback((x) => {
  //   if (!Number(x) || Number(x) < 1) {
  //     return
  //   }
  //   else setQuantity(x)
  // }, [quantity])
  const rerender = useCallback(()=>{
    setUpdate(!update)
  },[update])

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
  

  const handleSubmitVoteOption = async ({comment,score})=>{
    if(!comment || !score || !pid){
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }
    await apiRatings({description:comment,ratingStar:score,productId:pid,userId:uid})
    dispatch(showModal({isShowModal:false,modalChildren:null}))
    rerender()
  }
  const handleVoteNow = ()=>{
    if(!isLoggedIn){
      Swal.fire({
        text:"Đăng nhập trước để đánh giá sản phẩm",
        confirmButtonText:"Đăng nhập",
        cancelButtonText:"Hủy",
        showCancelButton:true,
        title:"Oops!"
      }).then(rs=>{
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
      })
    }else{
      dispatch(showModal(
        {isShowModal:true,modalChildren:<VoteOption nameProduct={product?.product_name} handleSubmitOption={handleSubmitVoteOption}/>
        }))

    }
  }
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
            {/* {renderStarFromNumber(product?.rating)} */}
            {renderStarFromNumber(product?.rating)?.map((el,index)=>(
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
      <div className='w-main m-auto mt-8'>
        <ProductInfomation des={product?.description} review={
          <div>
            <div className='flex p-4'>
              <div className='flex-4 flex flex-col items-center justify-center'>
                <span className='font-semibold text-3xl'>{`${product?.rating}/5`}</span>
                <span className='flex items-center gap-1'>{renderStarFromNumber(product?.rating)?.map((el,index)=>(
                  <span key={index}>{el}</span>
                ))}</span>
                <span>{`${feedbacks?.length} đánh giá`}</span>
              </div>
              <div className='flex-6 flex flex-col gap-2 py-8'>
                  {Array.from(Array(5).keys()).reverse().map(el=>(
                    <Votebar 
                        key={el}
                        number = {el+1}
                        ratingCount={feedbacks?.filter(i=> i.ratingStar === el + 1)?.length}
                        ratingTotal={feedbacks?.length}
                    />
                  ))}
              </div>
            </div>
            <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
              <span>Bạn đánh giá sao sản phẩm này</span>
              <Button handleOnClick={handleVoteNow}>Đánh giá ngay</Button>
            </div>
            <div className='flex flex-col gap-4'>
              {feedbacksPage?.map((el,index)=>(
                <Comment key={index} ratingStar={el.ratingStar} content={el.description} 
                updatedAt={el.updatedAt} name={el.userName} image={el.userAvatarUrl}/>
              ))}
            </div>
            <div>
              <Pagination totalPage={paginate?.pages} currentPage={paginate?.page} 
              pageSize={paginate?.pageSize} totalProduct={paginate?.total} onPageChange={(page)=>setCurrentPage(page)}/>
            </div>
          </div>
        } rerender = {rerender}/> 
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