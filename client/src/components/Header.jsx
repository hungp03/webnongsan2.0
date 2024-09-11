import React, { useState } from 'react';
import {Loading, HeaderButton} from './index';
import {Search, Menu } from 'lucide-react';
import './css/Header.css'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <Loading loading={isLoading} />
            <header className="header-background text-white">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">
                        <a className="navbar-brand d-none d-lg-flex align-items-center" href="#">
                            <img src="/logo.png" alt="Logo" className="me-2" width="50" height="50" />
                        </a>

                        <div className="search-container d-flex flex-grow-1 mx-2 mx-lg-4 order-1">
                            <div className="input-group" style={{ maxWidth: '400px' }}>
                                <input type="text" className="form-control" placeholder="Tìm kiếm..." aria-label="Search" />
                                <button className="btn btn-light" type="button">
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <Menu size={24} />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">
                            <div className="navbar-nav d-lg-none mt-3">
                                <HeaderButton isLoading={isLoading} handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
                            </div>
                        </div>

                        <div className="d-none d-lg-flex order-2">
                            <HeaderButton isLoading={isLoading} handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
