import React from 'react'
import { Button } from '../../components'
import { useLocation } from 'react-router-dom'
import { apiResetPassword } from '../../apis';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleResetPassword = async (data) => {
        const response = await apiResetPassword(data.password, token)
        console.log(response)
        if (!response.success) {
            toast.info(response.message)
        }
        else {
            toast.success(response.message)
        }
    }
    return (
        <div className="absolute animate-fade-in top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center justify-center py-8 z-50" >
            <div className="flex flex-col gap-4">
                <label htmlFor="password">Nhập mật khẩu mới</label>
                <input type="password" id="password" className="w-[800px] p-4 border-b outline-none rounded placeholder:text-sm"
                    {...register("password", {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        },
                        maxLength: {
                            value: 50,
                            message: 'Password must not exceed 50 characters'
                        }
                    })}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                <div className="flex items-center justify-end w-full">
                    <span
                        className="w-full text-gray-700 hover:text-blue-700 hover:underline cursor-pointer">Cancel</span>
                    <Button handleOnClick={handleSubmit(handleResetPassword)} >Xác nhận</Button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword