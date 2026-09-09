'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CustomerOrder, OrderStatus, OrderType, DirectPrintQuote, DesignRequestQuote } from '@/types';
import { formatEur } from '@/lib/pricing';
import QuoteReviewModal from './QuoteReviewModal';
import {
  Inbox,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCw,
  Search,
  PenTool,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Building,
  GraduationCap,
} from 'lucide-react';

export default function OrderTable() {
  const { orders, updateOrderStatus } = useAppStore();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCadOrder, setSelectedCadOrder] = useState<CustomerOrder | null>(null);

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'ALL' && order.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && order.type !== typeFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = order.customer.fullName.toLowerCase().includes(term);
      const matchId = order.id.toLowerCase().includes(term);
      const matchEmail = order.customer.email.toLowerCase().includes(term);
      const matchCity = order.customer.city.toLowerCase().includes(term);
      if (!matchName && !matchId && !matchEmail && !matchCity) return false;
    }
    return true;
  });

  // Metrics
  const totalCount = orders.length;
  const inProductionCount = orders.filter((o) => o.status === 'IN_PRODUCTION').length;
  const pendingCadCount = orders.filter(
    (o) => o.type === 'DESIGN_AND_PRINT' && o.status === 'QUOTE_SUBMITTED'
  ).length;
  const dispatchedCount = orders.filter((o) => o.status === 'DISPATCHED' || o.status === 'COMPLETED').length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'QUOTE_SUBMITTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
            Pending Review
          </span>
        );
      case 'APPROVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
            Quote Approved
          </span>
        );
      case 'IN_PRODUCTION':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">
            In Production
          </span>
        );
      case 'DISPATCHED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
            Dispatched (Randstad)
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
            Completed
          </span>
        );
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Metrics */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Inbox className="w-3.5 h-3.5" />
              <span>Production Control Desk</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Dutch Hub Order &amp; Intake Queue
            </h2>
            <p className="text-sm text-slate-400">
              Manage incoming 3D prints, review custom CAD design requests, and monitor Randstad courier shipments.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Total Live Orders</span>
            <div className="text-2xl font-bold text-white mt-1">{totalCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-amber-400">Pending CAD Reviews</span>
            <div className="text-2xl font-bold text-amber-400 mt-1">{pendingCadCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-orange-400">Printers Running</span>
            <div className="text-2xl font-bold text-orange-400 mt-1">{inProductionCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-emerald-400">Dispatched / Done</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{dispatchedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer, ID or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl bg-slate-950 border border-slate-800 py-2 px-3 text-slate-300 focus:outline-none focus:border-orange-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="QUOTE_SUBMITTED">Quote Submitted / Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="IN_PRODUCTION">In Production</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs rounded-xl bg-slate-950 border border-slate-800 py-2 px-3 text-slate-300 focus:outline-none focus:border-orange-500"
          >
            <option value="ALL">All Types</option>
            <option value="DIRECT_PRINT">Direct 3D Print</option>
            <option value="DESIGN_AND_PRINT">CAD Design Service</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order ID &amp; Date</th>
                <th className="py-3.5 px-4 font-semibold">Customer &amp; Region</th>
                <th className="py-3.5 px-4 font-semibold">Type &amp; Specs</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Price (€)</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isDirect = order.type === 'DIRECT_PRINT';
                  const directDetails = isDirect ? (order.details as DirectPrintQuote) : null;
                  const cadDetails = !isDirect ? (order.details as DesignRequestQuote) : null;

                  const orderPrice = isDirect
                    ? directDetails?.calculatedPriceEur || 0
                    : cadDetails?.quotedPriceEur || 0;

                  return (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* ID & Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-white block">{order.id}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('nl-NL', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <span>{order.customer.fullName}</span>
                          {order.customer.isStudent && (
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{order.customer.city}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                          {order.customer.email}
                        </div>
                      </td>

                      {/* Specs */}
                      <td className="py-4 px-4">
                        {isDirect && directDetails ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-semibold text-orange-400 text-[11px]">
                              <UploadCloud className="w-3 h-3" />
                              {directDetails.fileName}
                            </span>
                            <div className="text-[10px] text-slate-400">
                              {directDetails.material} • {directDetails.infillPercentage}% Infill •{' '}
                              {directDetails.volumeCm3} cm³
                            </div>
                          </div>
                        ) : cadDetails ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-400 text-[11px]">
                              <PenTool className="w-3 h-3" />
                              CAD Tier: {cadDetails.estimatedComplexity}
                            </span>
                            <div className="text-[10px] text-slate-400 line-clamp-1 max-w-[220px]">
                              {cadDetails.description}
                            </div>
                          </div>
                        ) : null}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {getStatusBadge(order.status)}

                          {/* Quick Status advance dropdown */}
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="mt-1 text-[10px] bg-slate-950 border border-slate-800 text-slate-400 rounded px-1.5 py-0.5 focus:outline-none"
                          >
                            <option value="QUOTE_SUBMITTED">Quote Submitted</option>
                            <option value="APPROVED">Approved</option>
                            <option value="IN_PRODUCTION">In Production</option>
                            <option value="DISPATCHED">Dispatched</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 whitespace-nowrap font-mono font-bold text-white">
                        {formatEur(orderPrice)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        {!isDirect && cadDetails && (
                          <button
                            onClick={() => setSelectedCadOrder(order)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 ml-auto"
                          >
                            <PenTool className="w-3 h-3" />
                            <span>Review &amp; Price</span>
                          </button>
                        )}

                        {isDirect && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'IN_PRODUCTION')}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors ml-auto"
                          >
                            Start Print
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CAD Review Modal */}
      {selectedCadOrder && (
        <QuoteReviewModal
          order={selectedCadOrder}
          onClose={() => setSelectedCadOrder(null)}
        />
      )}
    </div>
  );
}
