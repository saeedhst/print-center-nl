import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrintLab NL | Fast On-Demand 3D Printing (Haarlem • Amsterdam • Utrecht)',
  description:
    'On-demand 3D printing and CAD engineering service. Dispatched in just 1 working day across Haarlem, Amsterdam, and Utrecht. Instant 3D file quotes and 24-hour custom design services.',
  keywords: [
    '3D printing Haarlem',
    '3D printing Amsterdam',
    '3D printing Utrecht',
    '3D printen Nederland',
    'STL instant quote',
    'CAD design quote',
    'Rapid prototyping Randstad',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full light antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
