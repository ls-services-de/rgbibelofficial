"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { MdPersonOutline } from 'react-icons/md';
import useCartStore from "@/cartStore";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card p-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        <h1 className="font-poppins ml-4 text-white font-semibold">RGBibel Official</h1>
      </div>

      {/* Links for larger screens */}
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex space-x-8">
          <Link href="/" className="text-white hover:text-dimWhite font-poppins">Start</Link>
          <Link href="/products" className="text-white hover:text-dimWhite font-poppins">Shop</Link>
          <Link href="/konfigurator" className="text-white hover:text-dimWhite font-poppins">Konfigurator</Link>
          <a href="/#vision" className="text-white hover:text-dimWhite font-poppins">Kundenbewertungen</a>
          <Link href="/bewertung" className="text-white hover:text-dimWhite font-poppins">Bewertung</Link>
        </div>
      </div>

      {/* Icons and UserButton */}
      <div className="hidden md:flex items-center relative">
        {/* Cart Icon */}
        <Link href="/cart">
          <FaShoppingCart className="text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300" />
        </Link>
        <div className="ml-2 mr-4 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-semibold">
          {totalItems}
        </div>

        {/* Shipping Icon */}
        <Link href="/order">
          <MdLocalShipping className="text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300 mr-5" />
        </Link>

        {/* User Section */}
        {isSignedIn ? (
          <>
          <UserButton className="hover:scale-125 transition-transform duration-300" />
          <Link href="/dashboard"><p className='ml-5 text-primary'>Zum Dashboard</p></Link>
          </>
        ) : (
          <Link href="/dashboard" className="text-white hover:text-dimWhite font-poppins">
                <MdPersonOutline className='text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300'/>
              </Link>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card p-4 flex flex-col items-center space-y-4 md:hidden z-50">
          {/* Links */}
          <Link href="/" className="text-white hover:text-dimWhite font-poppins">Start</Link>
          <Link href="/products" className="text-white hover:text-dimWhite font-poppins">Shop</Link>
          <Link href="/konfigurator" className="text-white hover:text-dimWhite font-poppins">Konfigurator</Link>
          <a href="/#vision" className="text-white hover:text-dimWhite font-poppins">Kundenbewertungen</a>
          <Link href="/bewertung" className="text-white hover:text-dimWhite font-poppins">Bewertung</Link>

          {/* Icons */}
          <div className="flex items-center space-x-6 justify-center">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300" />
              <div className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-semibold">
                {totalItems}
              </div>
            </Link>

            {/* Shipping Icon */}
            <Link href="/order">
              <MdLocalShipping className="text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300" />
            </Link>

            {/* User Section */}
            {isSignedIn ? (
              <>
              <UserButton className="hover:scale-125 transition-transform duration-300" />
              <Link href="/dashboard"><p className='ml-5 text-primary'>Zum Dashboard</p></Link>
              </>
            ) : (
              <Link href="/dashboard" className="text-white hover:text-dimWhite font-poppins">
                <MdPersonOutline className='text-2xl text-white cursor-pointer hover:scale-125 transition-transform duration-300'/>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
