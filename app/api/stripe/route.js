import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Use the latest API version you are working with
});

export async function POST(req) {
  const { data } = await req.json();
  const { cart, paymentMethod } = data; // Assuming 'paymentMethod' is passed in the request data

  console.log('Received request data:', data); // Log incoming data

  try {
    // Create a customer (if you don't have a customer ID)
    const customer = await stripe.customers.create();
    console.log('Customer created with ID:', customer.id); // Log customer creation

    // Create line items array using cart data directly
    const lineItems = cart.map((product) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${product.name} (${product.color})`, // Adjust product details as needed
        },
        unit_amount: Math.round(Number(product.price) * 100), // price in cents
      },
      quantity: product.quantity,
    }));

    console.log('Line items:', lineItems); // Log line items created

    // Create a Checkout Session with the fixed totalAmount
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [          // SEPA direct debit
        'sepa_debit',    // Link (Stripe’s one-click payment)
                // Giropay
      ],
      line_items: lineItems, // Use the line items directly
      mode: 'payment',
      customer: customer.id,
      invoice_creation: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'], // Germany, Austria, Switzerland
      },
      success_url: `http://rgbibelofficial.com/success`,
      cancel_url: `http://rgbibelofficial.com/cancel`,
    });

    console.log('Stripe session created successfully:', session.id); // Log session creation

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error); // Log error if session creation fails
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  }
}
