import React from 'react';
import CheckoutPage from '@/components/checkout/CheckoutPage';

export const metadata = {
  title: 'Instant Checkout & Delivery | PrintLab.nl',
  description: 'Enter your delivery address, select Dutch courier options, and pay securely via iDEAL or Credit Card.',
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
