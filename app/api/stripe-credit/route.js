import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  const { data } = await req.json();
  const { cart } = data;

  console.log('Received request data:', data);

  try {
    // Create a customer (if you don't have a customer ID)
    const customer = await stripe.customers.create();
    console.log('Customer created with ID:', customer.id);

    // Create line items array using cart data directly and add 3% to the price
    const lineItems = cart.map((product) => {
      const increasedPrice = Number(product.price) * 1; // Increase by 3%
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} (${product.color})`,
          },
          unit_amount: Math.round(increasedPrice * 100), // price in cents
        },
        quantity: product.quantity,
      };
    });

    console.log('Line items:', lineItems);

    // Create a Checkout Session with the updated prices
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        'card',          // Normal credit/debit cards
        'eps',           // Klarna payment
        'giropay',
        'link',       // Google Pay
       // Giropay
      ],
      line_items: lineItems,
      mode: 'payment',
      customer: customer.id,
      invoice_creation: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      success_url: `http://rgbibelofficial.com/success`,
      cancel_url: `http://rgbibelofficial.com/cancel`,
    });

    console.log('Stripe session created successfully:', session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}
