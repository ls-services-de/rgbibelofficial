import React from 'react'
import WarrantyForm from '../components/WarrantyForm'
import Footer from '../components/Footer'
import Header from '../components/Header'

function page() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
    <Header />
    <div className='mt-[100px] flex-grow'>
    <WarrantyForm />
    </div>
    <Footer />
    </div>
    </>
  )
}

export default page