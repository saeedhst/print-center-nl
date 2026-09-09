import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrintLab NL | Rapid 3D Printing & CAD Design (Amsterdam • Utrecht • Den Haag)',
  description:
    'On-demand 3D printing and CAD engineering service in the Netherlands. Instant client-side STL analysis, live quotation, multi-material Bambu Lab AMS fleet, and same-day Randstad bike courier.',
  keywords: [
    '3D printing Netherlands',
    '3D printen Amsterdam',
    '3D printen Utrecht',
    'Den Haag 3D printing',
    'STL instant quote',
    'CAD design service NL',
    'Bambu Lab AMS 3D printing',
    'Student discount 3D printen',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
