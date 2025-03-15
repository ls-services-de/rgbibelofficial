'use client';

import React, { useState, useEffect } from 'react';
import MiniCard from '../components/MiniCard'; 
import { getProducts } from '@/sanity/product-utils';

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const allProducts = await getProducts();
        // Shuffle products and pick exactly 4
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <div className="mt-10 lg:w-[90%] xl:w-[70%] items-center mx-auto xxs:translate-x-[-50px] translate-x-0 ">
      <h2 className="text-2xl font-semibold text-primary mb-4 ml-4 lg:ml-20 text-center">Andere Produkte</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center">
        {randomProducts.map(product => (
          <MiniCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
