import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const AuthButtons = () => (
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
                <button className="btn btn-success mb-2 mb-lg-0 me-lg-2" onClick={() => setIsLoggedIn(true)}>Đăng nhập</button>
                <button className="btn btn-outline-light" onClick={() => setIsLoggedIn(true)}>Đăng ký</button>
            </>
        )
    );

    return (
        <header className="bg-success text-white">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand d-none d-lg-flex align-items-center" href="#">
                        <img src="/logo.png" alt="Logo" className="me-2" width="50" height="50" />
                    </a>

                    <div className="search-container d-flex flex-grow-1 mx-2 mx-lg-4 order-1">
                        <div className="input-group" style={{ maxWidth: '400px' }}>
                            <input type="text" className="form-control" placeholder="Tìm kiếm..." aria-label="Search" />
                            <button className="btn btn-primary" type="button">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <Menu size={24} />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <div className="navbar-nav d-lg-none mt-3">
                            <AuthButtons />
                        </div>
                    </div>

                    <div className="d-none d-lg-flex order-2">
                        <AuthButtons />
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default Navbar;
