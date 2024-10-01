import React, { memo, useState } from 'react'
import icons from '../utils/icons'
import { ratingStar } from '../utils/constants'

const { FaCaretDown, FaStar } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const [selected, setSelected] = useState([])
    const handleSelected = (e) =>{
        const alreadyEl = selected.find(el => el === e)
        if (alreadyEl) setSelected(prev => prev.filter(el => el!== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
    }
    console.log(selected)
    return (
        <div className='p-3 text-gray-700 text-xs gap-6 relative border border-gray-800 flex justify-between items-center cursor-pointer' onClick={() => changeActiveFilter(name)}>
            <span className='capitalize'>{name}</span>
            <FaCaretDown />
            {activeClick === name && <div className='z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[120px]'>
                {type === 'checkbox' && <div >
                    <div className='p-4 items-center flex justify-between gap-8'>
                        <span className='whitespace-nowrap'>{`${selected} selected`}</span>
                        <span className='underline cursor-pointer hover:text-main'>Reset</span>
                    </div>
                    <div className='flex flex-col gap-2' onClick={e => e.stopPropagation()}>
                        {ratingStar?.map((e, idx) => (
                            <div className='flex items-center gap-4' key={idx}>
                                <input type='checkbox' value={e} name={e}
                                    id={e} className='w-4 h-4' 
                                    onChange={handleSelected}
                                    checked={selected.some(selectedItem => selectedItem === e)}
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