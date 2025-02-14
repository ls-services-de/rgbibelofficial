'use client'

import React, { useState } from 'react';
import useCartStore from '@/configuratorStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Overview = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal());
  const resetCart = useCartStore((state) => state.resetCart);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Fehler beim Erstellen der Checkout-Session:', data.message);
      }
    } catch (error) {
      console.error('Fehler während des Checkouts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-20 px-4'>
      <h1 className="text-2xl md:text-3xl text-center font-semibold text-white mb-6">
        {totalItems} Komponenten im Warenkorb
      </h1>
      <table className="w-full border-collapse text-sm md:text-base">
        <thead>
          <tr className="text-primary border-b border-gray-200">
            <th className="py-2 px-2 md:px-4">Produkt</th>
            <th className="py-2 px-2 md:px-4">Anzahl</th>
            <th className="py-2 px-2 md:px-4">Preis</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product.product._id} className="hover:bg-card text-center border-b border-gray-300 text-white">
              <td className="py-2 px-2 md:px-4 flex items-center">
                <span className='truncate'>{product.product.name}</span>
              </td>
              <td className="py-2 px-2 md:px-4">{product.quantity}</td>
              <td className="py-2 px-2 md:px-4">{(product.product.price * product.quantity).toFixed(2)}€</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-white ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Gesamtpreis: {cartTotal}€</p>
      </div>
      
      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-primary text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Laden…' : 'Bezahlen'}
          </button>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link
          href="/konfigurator"
          className="px-6 py-3 bg-white text-black rounded-md"
          onClick={() => resetCart()} // Reset the cart when navigating back
        >
          Zurück zum Konfigurator
        </Link>
      </div>
    </div>
  );
};

export default Overview;
