import React from 'react';
import Header from '../components/Header';
import Order from '../components/Order';
import Footer from '../components/Footer';

function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-10">
        <Order />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
