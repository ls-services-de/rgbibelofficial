'use client'
import { useState } from 'react'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import UnSafePage from '../components/OrderAccount'
import ProfilePage from '../components/UserProfilePage'
import { IoIosLogOut } from "react-icons/io";
import Link from 'next/link'
import ServiceCards from '../components/DashboardContact'
import { MdContactMail } from "react-icons/md";



export default function Dashboard() {
  const [activePage, setActivePage] = useState('home')

  // Render content based on the active page
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return <div className="p-4"><UnSafePage /></div>
      case 'profile':
        return <div className="p-4"><ProfilePage /> </div>
      case 'settings':
        return <div className="p-4  text-primary"><ServiceCards /></div>
      default:
        return <div className="p-4"><UnSafePage /></div>
    }
  }

  return (
    <div className="flex h-screen flex-col md:flex-row ">
      <div className='fixed top-5 right-5 z-100'><Link href="/"><p className='text-white bg-card rounded p-2 border-2 border-white'>Zurück</p></Link></div>
      
      {/* Sidebar */}
      <div className="bg-card text-white flex md:flex-col items-center md:items-stretch md:h-full md:w-20 fixed bottom-0 w-full md:static md:flex-shrink-0 z-50 ">
        <button
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center justify-center py-2 md:py-4 md:my-2 w-full ${
            activePage === 'home' ? 'bg-primary' : ''
          }`}
        >
          <FiHome size={24} />
          <span className="text-sm mt-1">Start</span>
        </button>
        <button
          onClick={() => setActivePage('profile')}
          className={`flex flex-col items-center justify-center py-2 md:py-4 md:my-2 w-full ${
            activePage === 'profile' ? 'bg-primary' : ''
          }`}
        >
          <FiUser size={24} />
          <span className="text-sm mt-1">Profil</span>
        </button>
        
        <button
          onClick={() => setActivePage('settings')}
          className={`flex flex-col items-center justify-center py-2 md:py-4 md:my-2 w-full ${
            activePage === 'settings' ? 'bg-primary' : ''
          }`}
        >
          <MdContactMail  size={24} />
          <span className="text-sm mt-1">Kontakt</span>
        </button>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 ml-0 md:ml-20 ">
        {renderPageContent()}
      </div>
    </div>
  )
}
