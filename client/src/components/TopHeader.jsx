import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { getCurrentUser } from "../store/user/asyncActions";
//gọi action từ redux -> useDispatch
//lấy giá trị trong redux -> useSelector 
import { useDispatch, useSelector } from 'react-redux'
import {Logout} from './index'

const TopHeader = () => {
    const dispatch = useDispatch()
    const { isLoggedIn, current } = useSelector(
        state =>
            state.user
    )
    useEffect(() => {
        const setTimeoutId =  setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrentUser())
        }, 300);
        return ()=>{
            clearTimeout(setTimeoutId)
        }
    }, [dispatch, isLoggedIn])
    return (
        <div className="h-[38px] w-full bg-main flex items-center justify-center">
            <div className="w-main flex items-center justify-between text-xs text-white">
                <span>Liên hệ (+84) 123456789</span>
                {!isLoggedIn
                    ? <Link className=" hover:text-gray-700" to={`/${path.LOGIN}`}>Đăng nhập hoặc đăng ký</Link>
                    : <div className="flex items-center gap-2">
                        <span>{`Welcome, ${current?.name}`}</span>
                        <Logout/>
                    </div>}
            </div>
        </div>
    );
};

export default memo(TopHeader);
