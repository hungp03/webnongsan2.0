import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import icons from "./icons";
import { useMemo } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const { FaRegStar, FaStar } = icons;

export const createSlug = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-");
  

export const formatMoney = (money) => Number(money?.toFixed(1)).toLocaleString();

export const renderStarFromNumber = (number,size) => {
  if(!Number(number)) return
  const stars = []
  number = Math.round(number)
  for (let i = 0; i< +number; i++) stars.push(<AiFillStar color="orange" size={size || 16}/>)
  for(let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size || 16}/>)
  // return Array.from({ length: 5 }, (_, i) => 
  //   i < number ? <FaStar key={i} color="orange" /> : <FaRegStar key={i} color="orange" />
  // );
  return stars
};

export const generateRange = (start,end)=>{
  const length = end + 1 - start
  return Array.from({length},(_,index)=> start + index)
}

export const usePaginate = (totalPage, currentPage, pageSize, totalProduct, siblingCount = 1)=>{
  const paginationArray = useMemo(()=>{
    const totalPaginationItem = siblingCount + 5
    if(totalPage <= totalPaginationItem) return generateRange(1, totalPage)
    const isShowLeft = currentPage - siblingCount > 2
    const isShowRight = currentPage + siblingCount < totalPage - 1
    console.log(currentPage);
    console.log(isShowLeft);
    console.log(isShowRight);
    if(isShowLeft && !isShowRight){
        const rightStart = totalPage - 4
        const rightRange = generateRange(rightStart,totalPage)
        return [1, <BiDotsHorizontalRounded/>, ...rightRange]
    }
    if(!isShowLeft && isShowRight){
        const leftRange = generateRange(1,5)
        return [...leftRange, <BiDotsHorizontalRounded/>, totalPage]
    }
    const siblingLeft = Math.max(currentPage - siblingCount, 1)
    const siblingRight = Math.min(currentPage + siblingCount, totalPage)
    if(isShowLeft && isShowRight){
        const middleRange = generateRange(siblingLeft,siblingRight)
        return [1, <BiDotsHorizontalRounded/>, ...middleRange, <BiDotsHorizontalRounded/>, totalPage]
    }

    // if(isShowLeft && isShowRight){
    //   const siblingLeft = Math.max(currentPage - siblingCount, 1)
    //   const siblingRight = Math.min(currentPage + siblingCount, totalPage)
    //   // Kiểm tra điều kiện nếu currentPage nhỏ hơn hoặc bằng 3, không hiển thị dấu ba chấm ở phía trước
    //   if (currentPage <= 3) {
    //     return [...generateRange(1, 5), <BiDotsHorizontalRounded/>, totalPage];
    //   }
    //   // Kiểm tra nếu currentPage nằm gần cuối, không hiển thị dấu ba chấm phía sau
    //   if (currentPage >= totalPage - 2) {
    //     return [1, <BiDotsHorizontalRounded size={20} />, ...generateRange(totalPage - 4, totalPage)];
    //   }
    //   const middleRange = generateRange(siblingLeft,siblingRight)
    //   return [1, <BiDotsHorizontalRounded/>, ...middleRange, <BiDotsHorizontalRounded/>, totalPage]
    // }
  },[totalPage, currentPage, pageSize, totalProduct, siblingCount])
  return paginationArray
}


