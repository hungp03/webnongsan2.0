import React, { memo, useState, useEffect } from 'react'
import icons from '../utils/icons'
import { ratingStar } from '../utils/constants'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import path from '../utils/path'

const { FaCaretDown, FaStar } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const navigate = useNavigate()
    const {category} = useParams()
    const [selected, setSelected] = useState([])
    const handleSelected = (e) => {
        const value = e.target.value;
        if (selected.includes(value)) {
            setSelected(prev => prev.filter(el => el !== value));
        } else {
            setSelected(prev => [...prev, value]);
        }
    }

    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                rating: selected
            }).toString()
        })
    }, [selected])
    //console.log(selected)
    return (
        <div className='p-3 text-gray-700 text-xs gap-6 relative border border-gray-800 flex justify-between items-center cursor-pointer' onClick={() => changeActiveFilter(name)}>
            <span className='capitalize'>{name}</span>
            <FaCaretDown />
            {activeClick === name && <div className='z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[120px]'>
                {type === 'checkbox' && <div >
                    <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                        <span className='underline cursor-pointer hover:text-main' onClick={e => {
                            e.stopPropagation()
                            setSelected([])
                        }}>Reset</span>
                    </div>
                    <div className='flex flex-col gap-2' onClick={e => e.stopPropagation()}>
                        {ratingStar?.map((e, idx) => (
                            <div className='flex items-center gap-4' key={idx}>
                                <input
                                    type='checkbox'
                                    value={e}
                                    name={e}
                                    id={e}
                                    className='form-checkbox'
                                    onChange={handleSelected}
                                    checked={selected.includes(e)}
                                />
                                <label htmlFor={e} className='flex items-center gap-1'>
                                    {e} <FaStar color='yellow' />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)