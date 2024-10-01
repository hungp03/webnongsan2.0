import React from "react";
import { useSearchParams, useNavigate, createSearchParams, useParams } from "react-router-dom"
import clsx from "clsx";
import path from "../../utils/path";
import { useMemo } from 'react';

const PagiItem = ({children, onClick})=>{
    // const [params] = useSearchParams()
    // const navigate = useNavigate()
    // const {pid} = useParams()
    // const handlePagination = () => {
    //     let param = []
    //     for(let i of params.entries()) param.push(i)
    //     const queries = {}
    //     for( let i of param) queries[i[0]] = i[1]
    //     if(Number(children)) queries.page = children
    //     navigate({
    //         pathname: `/product/${pid}/ratings`,
    //         search: `${createSearchParams(queries)}`
    //     })
    // }
    return (
        <button className={clsx("p-2  w-10 h-10 justify-center flex ",
            !Number(children) && "items-end font-semibold text-xl mt-1", Number(children) && "items-center hover:rounded-full hover:bg-gray-300")} 
            onClick={onClick}
            type="button"
            disabled={!Number(children)}>{children}</button>
    )
}

export default PagiItem