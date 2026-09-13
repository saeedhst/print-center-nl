import React from 'react';
import OrderConfirmationView from '@/components/checkout/OrderConfirmationView';

export const metadata = {
  title: 'Order Confirmation | PrintLab.nl',
  description: 'Thank you for your order. Track your 3D print dispatch timeline and production status.',
};

export default function ConfirmationRoute() {
  return <OrderConfirmationView />;
}
