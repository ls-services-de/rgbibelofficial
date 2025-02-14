import React from 'react';
import Header from '../../components/Header';
import Details from '../../components/Details';
import RandomProducts from '../../components/RandomProducts';
import { getProductBySlug } from '@/sanity/product-utils';
import Footer from '@/app/components/Footer';

export default async function Page({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  return (
    <div>
      <Header />
      <div>
        <Details product={product[0]} />
      </div>
      <div className='h-auto '>
        <RandomProducts />
      </div>
      <Footer />
    </div>
  );
}
