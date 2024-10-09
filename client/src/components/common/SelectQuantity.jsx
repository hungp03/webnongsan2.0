import React, { memo } from 'react';

const SelectQuantity = ({ quantity, changeQuantity, maxQuantity }) => {
    return (
        <div className='flex items-center'>
            <span className='p-2 cursor-pointer text-main' onClick={() => changeQuantity('minus')}>-</span>
            <input
                className='px-4 py-2 outline-none w-[70px]'
                type='text'
                value={quantity}
                //onChange={e => handleQuantity(e.target.value)}
                min={1}
                max={maxQuantity} readOnly
            />
            <span className='p-2 cursor-pointer text-main' onClick={() => changeQuantity('plus')}>+</span>
        </div>
    );
};

export default memo(SelectQuantity);
