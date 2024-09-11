import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

const HeaderButton = ({ isLoading, handleLogin, isLoggedIn }) => {
    return (
        isLoggedIn ? (
            <>
                <button className="btn btn-link text-white w-100 mb-2 mb-lg-0 me-lg-2">
                    <ShoppingCart size={24} /> <span className="ms-2 d-lg-none">Giỏ hàng</span>
                </button>
                <button className="btn btn-link text-white w-100 mb-2 mb-lg-0">
                    <User size={24} /> <span className="ms-2 d-lg-none">Tài khoản</span>
                </button>
            </>
        ) : (
            <>
                <button className="btn btn-success mb-2 mb-lg-0 me-lg-2" onClick={handleLogin}>
                    Đăng nhập
                </button>
                <button className="btn btn-outline-light" onClick={handleLogin}>
                    Đăng ký
                </button>
            </>
        )
    );
};

export default HeaderButton;
