import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../utils/helper";
import { SelectOption } from "./";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import product_default from '../assets/product_default.png'
const { FaCartShopping, FaHeart } = icons;

const Product = ({ productData}) => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="w-full h-auto text-base px-[10px]">
      <Link
        onMouseEnter={(e) => {
          e.stopPropagation();
          setShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setShowOption(false);
        }}
        to={`${productData?.category}/${productData?.id}/${productData?.product_name}`}
        className="w-full border p-[15px] flex flex-col items-center">
        
        <div className="w-full relative flex items-center justify-center">
          {showOption && (
            <div className="absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top">
              <SelectOption key={productData.id + '1'} icon={<FaCartShopping />} />
              <SelectOption key={productData.id + '2'} icon={<FaHeart />} />
            </div>
          )}

          <img
            src={
              productData?.imageUrl || product_default
            }
            alt=""
            className="object-cover"/>
        </div>
        
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="line-clamp-1">{productData?.product_name}</span>
          <span className="flex">
            {renderStarFromNumber(productData?.rating)}
          </span>
          <span className="text-main">
            {formatMoney(productData?.price)} &#8363;
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
