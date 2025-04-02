'use client'

import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import useCartStore from "@/cartStore"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"

function Cart() {
  const initializeCart = useCartStore((state) => state.initializeCart)
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const totalItems = useCartStore((state) => state.totalItems)
  const cartTotal = useCartStore((state) => state.cartTotal)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [finalTotal, setFinalTotal] = useState(cartTotal)

  useEffect(() => {
    initializeCart()
  }, [initializeCart])

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
    const surcharge = cartTotal * surchargeRate
    setFinalTotal(cartTotal + surcharge)
  }

  const handleRemoveFromCart = (productId, color) => {
    const productToRemove = cart.find((item) => item._id === productId && item.color === color)
    if (productToRemove) {
      removeFromCart(productId, color)

      // Remove associated Windows if it exists
      const windowsItem = cart.find((item) => item._id === `windows-${productId}`)
      if (windowsItem) {
        removeFromCart(windowsItem._id, windowsItem.color)
      }

      // Remove associated shipping if it exists
      const shippingItem = cart.find((item) => item._id === `shipping-${productId}`)
      if (shippingItem) {
        removeFromCart(shippingItem._id, shippingItem.color)
      }

      const zpuItem = cart.find((item) => item._id === `zpu-${productId}`)
      if (zpuItem) {
        removeFromCart(zpuItem._id, zpuItem.color)
      }
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!paymentMethod) {
      alert("Bitte wählen Sie eine Zahlungsmethode aus.")
      return
    }
    setLoading(true)

    try {
      let endpoint = ""
      switch (paymentMethod) {
        case "stripe":
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

      const { data } = await axios.post(endpoint, {
        data: {
          cart: cart,
        },
      })

      if (data?.url) {
        window.location.href = data.url
      } else {
        console.error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Error during checkout:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-[200px] px-4">
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
            <tr
              key={product._id + product.color}
              className="hover:bg-card text-center border-b border-gray-300 text-white"
            >
              <td className="py-2 px-2 md:px-4 flex items-center">
                <Image className="mr-2" src={product?.image || "/placeholder.svg"} width={40} height={30} alt="" />
                <span className="truncate">{product.name}</span>
              </td>
              <td className="py-2 px-2 md:px-4">{product.quantity}</td>
              <td className="py-2 px-2 md:px-4">{(product.price * product.quantity).toFixed(2)}€</td>
              <td className="py-2 px-2 md:px-4">
                {!product._id.startsWith("windows-") && !product._id.startsWith("shipping-") && !product._id.startsWith("zpu-") && (
                  <FaTrash
                    onClick={() => handleRemoveFromCart(product._id, product.color)}
                    className="text-primary mx-auto cursor-pointer"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-white ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Zwischensumme: {cartTotal.toFixed(2)}€</p>
        {paymentMethod && paymentMethod !== "stripe" && (
          <p className="text-lg font-semibold text-right mr-4">
            Zahlungsmethoden-Gebühr: {(finalTotal - cartTotal).toFixed(2)}€
          </p>
        )}
        <p className="text-xl font-bold text-right mr-4">Gesamtpreis: {finalTotal.toFixed(2)}€</p>
      </div>

      <div className="mt-6 text-primary max-w-sm mx-auto space-y-4">
        {cartTotal > 0 && (
          <>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border bg-card rounded text-white"
            >
              <option value="">Zahlungsmethode auswählen</option>
              <option value="stripe">Lastschriftverfahren</option>
              <option value="paypal">Kreditkarte und Link (+1,5%)</option>
              <option value="klarna">Klarna (3%)</option>
            </select>
            <button
              onClick={onSubmit}
              className="text-lg w-full font-semibold text-center mr-4 bg-primary text-white py-2 px-4 rounded hover:text-primary hover:bg-white border border-[#5B20B6]"
            >
              {loading ? "Laden..." : "Jetzt bezahlen"}
            </button>
          </>
        )}

        <button className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-primary hover:text-white text-primary border border-[#5B20B6] py-2 px-4 rounded">
          <Link href="/products">Weiter einkaufen</Link>
        </button>
      </div>
    </div>
  )
}

export default Cart
