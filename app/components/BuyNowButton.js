"use client"

import { useState } from "react"
import PaymentMethodSelector from "./PaymentMethodSelector"

const BuyNowButton = ({ product }) => {
  const [showPaymentSelector, setShowPaymentSelector] = useState(false)

  const handleBuyNow = () => {
    setShowPaymentSelector(true)
  }

  const handleClose = () => {
    setShowPaymentSelector(false)
  }

  return (
    <>
      <button
        onClick={handleBuyNow}
        className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
      >
        Jetzt kaufen
      </button>
      {showPaymentSelector && <PaymentMethodSelector product={product} onClose={handleClose} />}
    </>
  )
}

export default BuyNowButton

