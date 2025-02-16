"use client"

import { useRouter } from "next/navigation"

function BuyNowButton({ product }) {
  const router = useRouter()

  const handleBuyNow = async () => {
    try {
      // Preis um 10 Euro erhöhen (oder passe den Wert nach Bedarf an)
      const updatedProduct = {
        ...product,
        price: product.price + 10,
      }

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            cart: [{ ...updatedProduct, quantity: 1 }],
            paymentMethod: "card",
          },
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url // Weiterleitung zur Stripe-Checkout-Seite
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    }
  }

  return (
    <button
      onClick={handleBuyNow}
      className="mt-4  bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
    >
      Jetzt kaufen 
    </button>
  )
}

export default BuyNowButton
