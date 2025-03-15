import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactForm from '../components/Contact'
import StatusCheck from '../components/StatusCheck'

export default function page() {
  return (
    <div>
        <Header />
        <ContactForm />
        <div className='xl:translate-y-[-90px]'>
        <StatusCheck />
        </div>
        <Footer />
    </div>
  )
}
