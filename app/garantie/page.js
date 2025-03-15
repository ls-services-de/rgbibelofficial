import React from 'react';
import WarrantyCheck from '../components/WarrantyCheck';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WarrantyCheck />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
