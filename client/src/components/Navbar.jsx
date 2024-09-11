import React, { useEffect, useState } from 'react';
import { apiGetCategories } from '../apis';
import './css/Navbar.css'
import { PackageSearch } from 'lucide-react';

const Navbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiGetCategories();
                if (response.data.statusCode === 200) {
                    setCategories(response.data.data.result);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);

    return (
        <div className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Categories
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categories.map((category) => (
                                        <a key={category.id} className="dropdown-item d-flex align-items-center" href="#">
                                            {category.imageUrl ? (
                                                <img
                                                    src={category.imageUrl}
                                                    alt={category.name}
                                                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                                                />
                                            ) : (
                                                <span className="placeholder-icon me-2"><PackageSearch /></span>
                                            )}
                                            {category.name}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pages</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-danger" href="#">Offers <span className="badge bg-danger">New</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
