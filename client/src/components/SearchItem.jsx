import React, { memo } from 'react'
import icons from '../utils/icons'

const { FaCaretDown } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
    return (
        <div className='p-3 text-gray-700 text-xs gap-6 relative border border-gray-800 flex justify-between items-center' onClick={()=>changeActiveFilter(name)}>
            <span className='capitalize'>{name}</span>
            <FaCaretDown />
            {activeClick === name && <div className='absolute top-full left-0 w-fit p-4'>Content</div>}
        </div>
    )
}

export default memo(SearchItem)