import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";

const { FaPhone, MdEmail, FaUserCircle, FaCartShopping } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-main h-[110px] py-[35px]">
      
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[120px] object-contain" />
      </Link>

      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex gap-4 items-center">
            <FaPhone color="#10B981" />
            <span className="font-medium">(+84) 123456789 </span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="#10B981" />
            <span className="font-medium">support@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className="cursor-pointer hover:underline flex items-center justify-center gap-2 px-5 border-r">
          <FaCartShopping color="#10B981" size={25} />
          <span>0 item(s)</span>
        </div>

        <div className="cursor-pointer hover:underline flex items-center justify-center px-5 gap-2">
          <FaUserCircle color="#10B981" size={25} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};
export default Header;