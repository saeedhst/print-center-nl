import React from 'react';
import AuthPage from '@/components/auth/AuthPage';

export const metadata = {
  title: 'Sign In / Account | PrintLab.nl',
  description: 'Log in or sign up to manage your 3D printing orders and operations.',
};

export default function AuthRoute() {
  return <AuthPage />;
}
