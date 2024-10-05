import React, { memo, useState, useEffect } from 'react';
import icons from '../utils/icons';
import {useNavigate, useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { FaCaretDown, FaTimes } = icons;

const SearchItem = ({ name, activeClick, changeActiveFilter, step, min, max }) => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [sliderValue, setSliderValue] = useState([min, max]);

    const handleSliderChange = (value) => {
        const queries = new URLSearchParams(window.location.search);
        queries.set(name, value.join('-'));
        navigate({
            pathname: `/${category}`,
            search: queries.toString()
        }, { replace: true });
        setSliderValue(value);
    };

    const handleReset = () => {
        const queries = new URLSearchParams(window.location.search);
        queries.delete(name);

        navigate({
            pathname: `/${category}`,
            search: queries.toString()
        }, { replace: true });

        setSliderValue([min, max]);
    };

    const handleClosePopup = () => {
        changeActiveFilter(null);
    };

    useEffect(() => {
        const queries = new URLSearchParams(window.location.search);
        const priceParam = queries.get('price');
        const ratingParam = queries.get('rating');

        if (name === 'price' && priceParam) {
            setSliderValue(priceParam.split('-').map(Number));
        } else if (name === 'rating' && ratingParam) {
            setSliderValue(ratingParam.split('-').map(Number));
        }
    }, [name, navigate]);

    return (
        <div
            className='p-3 text-gray-700 text-xs gap-6 relative border border-gray-800 flex justify-between items-center cursor-pointer'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize'>{name}</span>
            <FaCaretDown />
            {activeClick === name && (
                <div className='z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[170px]'>
                    <div className='flex justify-between items-center'>
                        <span className='font-semibold'>Filter by {name}</span>
                        <button onClick={handleClosePopup} className='text-gray-500 hover:text-red-500'>
                            <FaTimes />
                        </button>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between mb-2'>
                            <span>{sliderValue[0]}</span> 
                            <span>{sliderValue[1]}</span> 
                        </div>
                        <Slider
                            range
                            min={min}
                            max={max}
                            step={step}
                            value={sliderValue}
                            onChange={handleSliderChange}
                        />
                    </div>
                    <div className='mt-2 text-center'>
                        <button
                            className='hover:text-main underline text-sm'
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(SearchItem);
