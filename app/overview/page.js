"use client"

import { useState, useEffect } from "react"
import useCartStore from "@/configuratorStore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Overview = () => {
  const cart = useCartStore((state) => state.cart)
  const totalItems = useCartStore((state) => state.totalItems)
  const cartTotal = useCartStore((state) => state.cartTotal())
  const resetCart = useCartStore((state) => state.resetCart)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [finalTotal, setFinalTotal] = useState(Number.parseFloat(cartTotal))
  const router = useRouter()

  useEffect(() => {
    calculateFinalTotal()
  }, [cartTotal, paymentMethod])
  

  const calculateFinalTotal = () => {
    let surchargeRate = 0
    switch (paymentMethod) {
      case "paypal":
        surchargeRate = 0 // 1.5%
        break
      case "klarna":
        surchargeRate = 0.03 // 3%
        break
      default:
        surchargeRate = 0
    }
    const surcharge = Number.parseFloat(cartTotal) * surchargeRate
    setFinalTotal(Number.parseFloat(cartTotal) + surcharge)
  }

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.")
      return
    }
    setIsLoading(true)
    try {
      let endpoint = ""
      switch (paymentMethod) {
        case "stripe":
          endpoint = "/checkout/stripe"
          break
        case "paypal":
          endpoint = "/checkout/stripe-credit"
          break
        case "klarna":
          endpoint = "/checkout/stripe-pay-klar"
          break
        default:
          throw new Error("Invalid payment method")
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, finalTotal }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Fehler beim Erstellen der Checkout-Session:", data.message)
        alert("Fehler beim Erstellen der Checkout-Session. Bitte versuchen Sie es später erneut.") //Added alert for user feedback
      }
    } catch (error) {
      console.error("Fehler während des Checkouts:", error)
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.") //Added alert for user feedback
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Header />
    <div className="max-w-3xl mx-auto mt-20 px-4 overflow-x-hidden">
      <h1 className="text-2xl md:text-3xl text-center font-semibold text-white mb-6">
        {totalItems} Komponenten im Warenkorb
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="text-primary border-b border-gray-200">
              <th className="py-2 px-2 md:px-4">Produkt</th>
              <th className="py-2 px-2 md:px-4">Anzahl</th>
              <th className="py-2 px-2 md:px-4">Preis</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item.product._id} className="hover:bg-card text-center border-b border-gray-300 text-white">
                <td className="py-2 px-2 md:px-4 flex items-center">
                  <span className="truncate">{item.product.name}</span>
                </td>
                <td className="py-2 px-2 md:px-4">{item.quantity}</td>
                <td className="py-2 px-2 md:px-4">{(item.product.price * item.quantity).toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-white ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Zwischensumme: {cartTotal}€</p>
        {paymentMethod && paymentMethod !== "stripe" && (
          <p className="text-lg font-semibold text-right mr-4">
            Zahlungsmethoden-Gebühr: {(finalTotal - Number.parseFloat(cartTotal)).toFixed(2)}€
          </p>
        )}
        <p className="text-xl font-bold text-right mr-4">Gesamtpreis: {finalTotal.toFixed(2)}€</p>
      </div>

      {cart.length > 0 && (
        <div className="mt-6 space-y-4">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border bg-card rounded text-white"
          >
            <option value="">Zahlungsmethode auswählen</option>
            <option value="stripe">Lastschriftverfahren</option>
            <option value="paypal">Kreditkarte und Link </option>
            <option value="klarna">Klarna (3%)</option>
          </select>
          <button
            onClick={handleCheckout}
            className="w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Laden…" : "Jetzt bezahlen"}
          </button>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link
          href="/konfigurator"
          className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => resetCart()}
        >
          Zurück zum Konfigurator
        </Link>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Overview