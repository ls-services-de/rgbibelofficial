import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


function layout({children}) {
  return (
    <>
   <Header/>
    <div className='flex items-center justify-center h-screen max-w-full mt-5'>

        {children}

        </div>
    <Footer />
        </>
  )
}

export default layout