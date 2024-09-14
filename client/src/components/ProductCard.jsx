import React from "react";
import { formatMoney } from "../utils/helper";

const ProductCard = ({ image, title, totalRatings, price }) => {
  return (
    <div className="w-1/3 flex flex-auto px-2 mb-5">
      <div className="flex w-full border">
        
        <img
          src={image}
          alt="product"
          className="w-[100px] object-contain p-4"/>

        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {title?.toLowerCase()}
          </span>
          {/* <span className="flex">{renderStarFromNumber(totalRatings)}</span> */}
          <span className="text-main">{formatMoney(price) || ""} &#8363;</span>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;