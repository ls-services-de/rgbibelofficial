import React from 'react';
import Link from 'next/link';

function MiniCard({ product }) {
  return (
    <Link href={`/details/${product.slug}`}>
      <div className='bg-card text-white p-4 rounded-md shadow-md hover:bg-[#035163] transition-colors duration-300 flex flex-col items-center  w-[300px] ml-20'>
        {/* Product Image */}
        <div className=' flex items-center justify-center overflow-hidden rounded-md mb-2'>
          <img
            src={product.image}
            alt={product.name}
            className='w-auto h-[200px]'
          />
        </div>
        {/* Product Name and Price */}
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <p className='text-sm mt-1'>{product.price}€</p>
      </div>
    </Link>
  );
}

export default MiniCard;
