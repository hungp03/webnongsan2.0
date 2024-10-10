import React, { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import icons from "@/utils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "@/utils/path";
import { apiGetProducts } from "@/apis/product";
import { ProductMiniItem } from "@/components";
import product_default from '@/assets/product_default.png';
const { FaUserCircle, FaCartShopping } = icons;

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(null); 
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const resultsRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      // Clear any existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Set new timeout for search
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 1500);
    } else {
      setProducts(null); 
      setShowResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearch = async () => {
    setError(null);
    setProducts(null); 
    try {
      const params = {
        page: 1,
        size: 3,
        filter: `product_name~'${searchTerm}'`,
      };
      const response = await apiGetProducts(params);
      setProducts(response.data.result);
      setShowResults(true);
    } catch (error) {
      setError("Error fetching products");
    }
  };

  const handleShowAll = () => {
    navigate(`/products?search=${searchTerm}`);
  };

  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      // Clear the timeout when Enter is pressed
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <div className="flex justify-between items-center w-main h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[120px] object-contain" />
      </Link>

      <div className="flex flex-grow justify-center mx-5 relative items-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} 
          className="w-[500px] border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {showResults && (
          <div ref={resultsRef} className="absolute top-full w-[500px] bg-white shadow-md rounded-md mt-2 z-10">
            {error ? (
              <div className="text-red-500 p-2 text-sm">{error}</div>
            ) : products && products.length > 0 ? (
              <>
                {products.map((product) => (
                  <div key={product.id} className="p-2 border-b">
                    <Link to={`/${encodeURIComponent(product.category)}/${product.id}/${encodeURIComponent(product.product_name)}`}>
                      <ProductMiniItem title={product.product_name} image={product.imageUrl || product_default} price={product.price} />
                    </Link>
                  </div>
                ))}
                <button
                  onClick={handleShowAll}
                  className="w-full p-2 text-green-500 hover:underline text-sm"
                >
                  Hiển thị tất cả
                </button>
              </>
            ) : (
              <div className="p-2 text-sm">Không tìm thấy sản phẩm.</div>
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex">
        <div className="cursor-pointer hover:underline flex items-center justify-center gap-2 px-5 border-r">
          <FaCartShopping color="#10B981" size={25} />
          <span>0 sản phẩm</span>
        </div>

        <div className="cursor-pointer hover:underline flex items-center justify-center px-5 gap-2">
          <FaUserCircle color="#10B981" size={25} />
          <span>Tài khoản</span>
        </div>
      </div>
    </div>
  );
};

export default Header;