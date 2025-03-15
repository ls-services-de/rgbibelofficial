import React from 'react';
import Link from 'next/link';

function Cardtw({ product }) {
  return (
    <Link href={`/details/${product.slug}`}>
      <div
        className="relative shadow-md max-w-[200px] mt-10 cursor-pointer card2 rounded-lg h-[65vh] sm:h-[50vh] lg:h-[70vh] xl:h-[55vh] tablet:h-[40vh] flex flex-col justify-between p-4 mx-auto"
        style={{
          backgroundImage: `url('/cardbg-tw.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Image Container */}
        <div className="flex justify-center items-center overflow-hidden h-[200px] hover:scale-105 transition-transform duration-300">
          <img
            src={product.image}
            className="w-auto h-full object-contain"
            alt="product"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start text-left mt-4">
          <h1 className="text-[#FFD100] text-lg lg:text-xl font-semibold">
            {product.name}
          </h1>
          <p className="text-sm lg:text-base text-gray-400 mt-2 max-w-[180px]">
            {product.description}
          </p>
        </div>

        {/* Price Tag */}
        <div className="self-start mt-4 bg-black shadow-md rounded p-2">
          <span className="text-[#FFD100] text-base lg:text-lg font-semibold">
            {product.price}€
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Cardtw;
