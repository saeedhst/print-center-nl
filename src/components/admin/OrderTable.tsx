'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { CustomerOrder, OrderStatus, DirectPrintQuote, DesignRequestQuote } from '@/types';
import { formatEur } from '@/lib/pricing';
import QuoteReviewModal from './QuoteReviewModal';
import {
  Inbox,
  Search,
  PenTool,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function OrderTable() {
  const { orders, updateOrderStatus, setActiveView } = useAppStore();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCadOrder, setSelectedCadOrder] = useState<CustomerOrder | null>(null);

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

  const totalCount = orders.length;
  const inProductionCount = orders.filter((o) => o.status === 'IN_PRODUCTION').length;
  const pendingCadCount = orders.filter(
    (o) => o.type === 'DESIGN_AND_PRINT' && o.status === 'QUOTE_SUBMITTED'
  ).length;
  const completedCount = orders.filter((o) => o.status === 'COMPLETED' || o.status === 'DISPATCHED').length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'QUOTE_SUBMITTED':
        return (
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-label-mono-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending Review
          </span>
        );
      case 'APPROVED':
        return (
          <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold font-label-mono-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Quote Approved
          </span>
        );
      case 'IN_PRODUCTION':
        return (
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold font-label-mono-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            In Production
          </span>
        );
      case 'DISPATCHED':
        return (
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-bold font-label-mono-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Dispatched (24h)
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold font-label-mono-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Delivered
          </span>
        );
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Inbox className="w-3.5 h-3.5 text-slate-700" />
              <span>Operations Queue</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Haarlem, Amsterdam &amp; Utrecht Intake Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage incoming 3D prints, review 24h design requests, and monitor 1-day dispatches.
            </p>
          </div>

          <button
            onClick={() => setActiveView('landing')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            &larr; Return to Store
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
            <span className="text-xs text-slate-500 font-semibold">Total Orders</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-outline-variant shadow-level-1">
            <span className="text-xs text-amber-700 font-semibold font-label-mono-xs uppercase">Pending CAD Quotes</span>
            <div className="text-2xl font-bold text-amber-700 mt-1 font-label-mono">{pendingCadCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-outline-variant shadow-level-1">
            <span className="text-xs text-primary font-semibold font-label-mono-xs uppercase">In Production</span>
            <div className="text-2xl font-bold text-primary mt-1 font-label-mono">{inProductionCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-outline-variant shadow-level-1">
            <span className="text-xs text-emerald-700 font-semibold font-label-mono-xs uppercase">Dispatched / Done</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1 font-label-mono">{completedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-outline-variant shadow-level-1 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer, ID, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded bg-surface-container-low border border-outline-variant text-on-surface placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded bg-surface-container-low border border-outline-variant py-2 px-3 text-slate-700 font-medium focus:outline-none focus:border-primary font-body-sm cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="QUOTE_SUBMITTED">Quote Submitted</option>
            <option value="APPROVED">Approved</option>
            <option value="IN_PRODUCTION">In Production</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="COMPLETED">Delivered</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs rounded bg-surface-container-low border border-outline-variant py-2 px-3 text-slate-700 font-medium focus:outline-none focus:border-primary font-body-sm cursor-pointer"
          >
            <option value="ALL">All Tracks</option>
            <option value="DIRECT_PRINT">Track 01: 3D File</option>
            <option value="DESIGN_AND_PRINT">Track 02: CAD Design</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Order ID</th>
                <th className="py-3.5 px-4 font-bold">Customer &amp; City</th>
                <th className="py-3.5 px-4 font-bold">Option &amp; Details</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Price</th>
                <th className="py-3.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
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
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-slate-900 block">{order.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('nl-NL', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{order.customer.fullName}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{order.customer.city}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
                          {order.customer.email}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        {isDirect && directDetails ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-bold text-on-surface text-xs">
                              <UploadCloud className="w-3.5 h-3.5 text-primary" />
                              {directDetails.fileName}
                            </span>
                            <div className="text-[10px] text-slate-500 font-label-mono-xs">
                              {directDetails.material} &bull; {directDetails.scaleFactor * 100}% Scale &bull; {directDetails.volumeCm3} cm&sup3;
                            </div>
                          </div>
                        ) : cadDetails ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 font-bold text-primary text-xs">
                              <PenTool className="w-3.5 h-3.5 text-primary" />
                              CAD Tier: {cadDetails.estimatedComplexity}
                            </span>
                            <div className="text-[10px] text-slate-500 truncate max-w-[220px]">
                              {cadDetails.description}
                            </div>
                          </div>
                        ) : null}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {getStatusBadge(order.status)}

                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="mt-1 text-[10px] bg-slate-50 border border-slate-200 text-slate-600 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
                          >
                            <option value="QUOTE_SUBMITTED">Quote Submitted</option>
                            <option value="APPROVED">Approved</option>
                            <option value="IN_PRODUCTION">In Production</option>
                            <option value="DISPATCHED">Dispatched</option>
                            <option value="COMPLETED">Delivered</option>
                          </select>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-xs font-bold text-on-surface font-label-mono">
                        {isDirect && directDetails ? (
                          formatEur(directDetails.calculatedPriceEur)
                        ) : cadDetails?.quotedPriceEur ? (
                          formatEur(cadDetails.quotedPriceEur)
                        ) : (
                          <span className="text-amber-700 italic font-normal">Pending Quote</span>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        {!isDirect && cadDetails && (
                          <button
                            onClick={() => setSelectedCadOrder(order)}
                            className="px-3 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold transition-colors ml-auto cursor-pointer"
                          >
                            Review &amp; Price
                          </button>
                        )}

                        {isDirect && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'IN_PRODUCTION')}
                            className="px-3 py-1.5 rounded bg-primary hover:bg-primary-hover active:bg-[#003cb8] text-white text-xs font-bold transition-colors ml-auto cursor-pointer shadow-xs"
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

      {selectedCadOrder && (
        <QuoteReviewModal
          order={selectedCadOrder}
          onClose={() => setSelectedCadOrder(null)}
        />
      )}
    </div>
  );
}
