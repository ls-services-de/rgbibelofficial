import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  const { cart } = await req.json();

  try {
    // Erstelle einen Kunden (falls nicht vorhanden)
    const customer = await stripe.customers.create();

    // Erstelle die Line Items für den Checkout
    const lineItems = cart.map((product) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.product.name,
        },
        unit_amount: product.product.price * 100, // Preis in Cent
      },
      quantity: product.quantity,
    }));

    // Erstelle eine Checkout-Session
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

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Fehler beim Erstellen der Checkout-Session:', error);
    return NextResponse.json({ status: 500, message: 'Interner Serverfehler' });
  }
}
