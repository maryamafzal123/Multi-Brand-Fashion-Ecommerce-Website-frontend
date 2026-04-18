import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreHydration from '@/components/StoreHydration';

const jost = Jost({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: "Brand Bazar — Premium Women's Unstitched",
  description: "Premium women's unstitched fabric — Lawn, Embroidered, Printed, Linen & Chiffon. Delivered across Pakistan.",
  keywords: 'women unstitched, lawn suits, embroidered fabric, Pakistan fashion, Brand Bazar, by Mirsa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={jost.variable} suppressHydrationWarning>
        <StoreHydration />
        {children}
        <Toaster position="top-right" toastOptions={{
          duration: 2500,
          style: {
            background: '#111', color: '#fff',
            fontSize: '0.72rem', letterSpacing: '0.08em',
            borderRadius: '0', borderLeft: '2px solid #b8960c',
          },
        }} />
      </body>
    </html>
  );
}
