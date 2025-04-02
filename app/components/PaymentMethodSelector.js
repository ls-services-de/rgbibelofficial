"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const PaymentMethodSelector = ({ product, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  

  // Calculate shipping cost based on product type
  const calculateShippingCost = (product) => {
    let cost = 0;
    

    switch (product.type) {
        case "mouse":
            cost = 9.95;
            break;
        case "keyboard":
            cost = 14.95;
            break;
        case "monitor":
            cost = 19.95;
            break;
        case "pc":
            if (product.price < 2500) {
                cost = 29.99;
            } else {
                cost = 35.99;
            }
            break;
        default:
            console.warn("Unbekannter Produkttyp, Standardversandkosten werden angewendet.");
            cost = 34.9;
    }
    
    console.log(`Produkttyp: ${product.productType}, Versandkosten: ${cost}€`);
    return cost;
};

  const calculateTotalPrice = () => {
    const shippingCost = calculateShippingCost(product)
    const basePrice = product.price + shippingCost

    switch (paymentMethod) {
      case "paypal":
        return Math.round(basePrice * 1) // PayPal: 1.5% surcharge, gerundet
      case "klarna":
        return Math.round(basePrice * 1.03) // Klarna: 3% surcharge, gerundet
      default:
        return Math.round(basePrice) // Standardpreis, gerundet
    }
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.")
      return
    }

    setIsLoading(true)

    try {
      const totalPrice = calculateTotalPrice()

      let endpoint = ""
      switch (paymentMethod) {
        case "card":
          endpoint = "/api/stripe"
          break
        case "paypal":
          endpoint = "/api/stripe-credit"
          break
        case "klarna":
          endpoint = "/api/stripe-pay-klar"
          break
        default:
          throw new Error("Invalid payment method")
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            cart: [{ ...product, price: totalPrice, quantity: 1 }],
            paymentMethod: paymentMethod,
          },
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error("No URL returned from the server")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate shipping cost for display
  const shippingCost = calculateShippingCost(product)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">Zahlungsmethode auswählen</h2>
        <select value={paymentMethod} onChange={handlePaymentMethodChange} className="w-full p-2 border rounded mb-4">
          <option value="">Bitte auswählen</option>
          <option value="card">Lastschriftverfahren</option>
          <option value="paypal">Kreditkarte und Link</option>
          <option value="klarna">Klarna (+3%)</option>
        </select>
        <div className="mb-4">
          <p>Produktpreis: {product.price.toFixed(2)}€</p>
          <p>Versandkosten: {shippingCost.toFixed(2)}€</p>

          {paymentMethod && (
            <>
              <p className="font-semibold">Gesamtpreis: {calculateTotalPrice().toFixed(2)}€</p>
            </>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleCheckout}
            disabled={isLoading || !paymentMethod}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? "Wird bearbeitet..." : "Zur Zahlung"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodSelector

