import React from "react";
import { useSearchParams, useNavigate, createSearchParams, useParams } from "react-router-dom"
import clsx from "clsx";

const PagiItem = ({ children, onClick }) => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const {category} = useParams()
    const handlePagination = () => {
        let param = []
        for(let i of params.entries()) param.push(i)
        const queries = {}
        for( let i of param) queries[i[0]] = i[1]
        if(Number(children)) queries.page = children
        navigate({
            pathname: `/${category}`,
            search: `${createSearchParams(queries)}`
        })
    }
    return (
        <button className={clsx("p-2  w-10 h-10 justify-center flex ",
            !Number(children) && "items-end font-semibold text-xl mt-1", Number(children) && "items-center hover:rounded-full hover:bg-gray-300")}
            onClick={handlePagination}
            type="button"
            disabled={!Number(children)}>{children}</button>
    )
}

export default PagiItem