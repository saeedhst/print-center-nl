import React from 'react';
import OrderTable from '@/components/admin/OrderTable';

export const metadata = {
  title: 'Operations & Order Queue | PrintLab.nl Staff Desk',
  description: 'Manage live 3D print jobs, review CAD requests, and monitor Randstad dispatches.',
};

export default function AdminRoute() {
  return <OrderTable />;
}
