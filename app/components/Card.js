import React from 'react';
import Link from 'next/link';

function Cardtw({ product }) {
  return (
    <Link href={`/details/${product.slug}`}>
      <div
        className="relative shadow-md max-w-[300px] mt-10 cursor-pointer card2 rounded-lg h-auto sm:h-[50vh] lg:h-[70vh] xl:h-[55vh] tablet:h-[40vh] flex flex-col justify-between p-6 mx-auto transition-transform duration-300 hover:scale-105"
        style={{
          backgroundImage: `url('/cardbg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Image Container */}
        <div className="flex justify-center items-center overflow-hidden h-[200px] ">
          <img
            src={product.image}
            className="w-auto h-full object-contain"
            alt="product"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start text-left mt-6 lg:mt-10">
          <h1 className="text-primary text-lg lg:text-[15px] xl:text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </h1>
          <p className="text-sm lg:text-base text-gray-400  max-w-[220px] line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Price Tag */}
        <div className="self-start mt-4 bg-black shadow-md rounded p-2">
          <span className="text-primary text-base lg:text-lg font-semibold">
            {product.price}€
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Cardtw;
