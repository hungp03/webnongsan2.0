import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb, ProductCard, FilterItem } from '../../components';
import { apiGetProducts, apiGetMaxPrice } from '../../apis';
import Masonry from 'react-masonry-css';
import { v4 as uuidv4 } from 'uuid';
import SortItem from '../../components/SortItem';
import { sortProductOption } from '../../utils/constants';

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2
};

const Product = () => {
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  // console.log(params)
  const { category } = useParams();
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortOption, setSortOption] = useState('')

  const fetchMaxPrice = async () => {
    const res = await apiGetMaxPrice(category);
    if (res.statusCode === 200) {
      setMaxPrice(res.data)
    }
  }
  const fetchProducts = async (queries) => {
    const response = await apiGetProducts(queries);
    setProducts(response.data.result);
  };

  useEffect(() => {
    fetchMaxPrice()
  }, [category])

  useEffect(() => {
    const sortValue = params.get('sort') || '';
    setSortOption(sortValue);
  }, [params]);
  
  useEffect(() => {
    
    let queries = {
      page: 1,
      size: 10,
      filter: []
    };

    let ratings = [], priceRange = [];

    if (category) {
      queries.filter.push(`category.name~'${category}'`);
    }

    for (let [key, value] of params.entries()) {
      if (key === 'rating') {
        const ratingValues = value.split('-');
        ratings.push(...ratingValues);
      } else if (key === 'price') {
        const priceValues = value.split('-');
        priceRange.push(...priceValues);
      }
    }

    if (ratings.length > 0) {
      queries.filter.push(`rating >= ${ratings[0]} and rating <= ${ratings[1]}`);
    }

    if (priceRange.length > 0) {
      queries.filter.push(`price >= ${priceRange[0]} and price <= ${priceRange[1]}`);
    }

    if (sortOption) {
      const [sortField, sortDirection] = sortOption.split('-');
      queries.sort = `${sortField},${sortDirection}`;
    }

    if (queries.filter.length > 0) {
      queries.filter = encodeURIComponent(queries.filter.join(' and '));
    } else {
      delete queries.filter;
    }

    fetchProducts(queries);
  }, [params, sortOption]);

  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) setActiveClick(null);
    else setActiveClick(name);
  }, [activeClick]);

  return (
    <div className='w-full'>
      <div className='h-20 flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
        <div className='w-4/5 flex-auto flex items-center gap-4'>
          <span className='font-semibold text-sm'>Lọc</span>
          <FilterItem name='price' activeClick={activeClick} changeActiveFilter={changeActiveFilter} range min={0} max={maxPrice} step={1000} />
          <FilterItem name='rating' activeClick={activeClick} changeActiveFilter={changeActiveFilter} range min={0} max={5} step={0.5} />
        </div>
        <div className='w-1/5 flex-auto'>
          <SortItem sortOption={sortOption} setSortOption={setSortOption} sortOptions={sortProductOption} />
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-0"
          columnClassName="my-masonry-grid_column mb-[-20px]">
          {products?.map((e) => (
            <ProductCard key={uuidv4()} productData={e} />
          ))}
        </Masonry>
      </div>
      <div className='w-full h-[400px]'></div>
    </div>
  );
};

export default Product;
