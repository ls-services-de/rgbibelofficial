import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import useCartStore from '@/cartStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Cart() {
  const initializeCart = useCartStore((state) => state.initializeCart);
  const cart = useCartStore((state) => state.cart); // Retrieve the cart from the store
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    initializeCart(); // Load cart from local storage when the component mounts
  }, [initializeCart]);

  const handleRemoveFromCart = (productId, color) => {
    removeFromCart(productId, color);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/stripe', {
        data: {
          cart: cart, // Send the entire cart
        },
      });

      if (data?.url) {
        window.location.href = data.url; // Redirect to the Stripe Checkout page
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-[200px] px-4'>
      <h1 className="text-2xl md:text-3xl text-center font-semibold text-white mb-6">
        {totalItems} Produkt(e) im Warenkorb
      </h1>

      <table className="w-full border-collapse text-sm md:text-base">
        <thead>
          <tr className="text-primary border-b border-gray-200">
            <th className="py-2 px-2 md:px-4">Produkt</th>
            <th className="py-2 px-2 md:px-4">Anzahl</th>
            <th className="py-2 px-2 md:px-4">Preis</th>
            <th className="py-2 px-2 md:px-4">Entfernen</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product._id + product.color} className="hover:bg-card text-center border-b border-gray-300 text-white">
              <td className="py-2 px-2 md:px-4 flex items-center">
                <img className='mr-2' src={product?.image} width={40} height={30} alt="" />
                <span className='truncate'>{product.name}</span>
              </td>
              <td className="py-2 px-2 md:px-4">{product.quantity}</td>
              <td className="py-2 px-2 md:px-4">{(product.price * product.quantity).toFixed(2)}€</td>
              <td className="py-2 px-2 md:px-4">
                <FaTrash
                  onClick={() => handleRemoveFromCart(product._id, product.color)} 
                  className="text-primary mx-auto cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="mt-4 text-white ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Gesamtpreis: {cartTotal.toFixed(2)}€</p>
      </div>

      <div className="mt-6 text-primary max-w-sm mx-auto space-y-4">
        {cartTotal > 0 && (
          <button onClick={onSubmit} className="text-lg w-full font-semibold text-center mr-4 bg-primary text-white py-2 px-4 rounded hover:text-primary hover:bg-white border border-[#5B20B6]">
            {loading ? "Laden..." : "Bezahlen"}
          </button>
        )}

        <button className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-primary hover:text-white text-primary border border-[#5B20B6] py-2 px-4 rounded">
          <Link href="/products">Weiter einkaufen</Link>
        </button>
      </div>
    </div>
  );
}

export default Cart;
