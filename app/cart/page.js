"use client"

import React from 'react'
import Header from '../components/Header'
import Cart from '../components/Cart'


import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Initialize Stripe outside of the component to avoid recreating the instance on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Page() {
  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <Cart />
      </Elements>

    </div>
  )
}

export default Page
