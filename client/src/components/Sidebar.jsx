import React, { useState, useEffect } from 'react'
import { apiGetCategories } from '../apis';
const Sidebar = () => {
    const [categories, setCategories] = useState(null);
    const fetchCategories = async () => {
        const res = await apiGetCategories();
        
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <div>Sidebar</div>
    )
}

export default Sidebar