import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StoreHydration from '@/components/StoreHydration';

const jost = Jost({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: "Brand Bazar — Premium Women's Unstitched",
  description:
    "Premium women's unstitched fabric — Lawn, Embroidered, Printed, Linen & Chiffon. Delivered across Pakistan.",

  openGraph: {
    title: "Brand Bazar — Premium Women's Unstitched",
    description:
      "Premium women's unstitched fabric — Lawn, Embroidered, Printed, Linen & Chiffon.",
    url: "https://brandbazarbymirsa.com",
    siteName: "Brand Bazar",
    images: [
      {
        url: "https://brandbazarbymirsa.com/og-image.jpeg", // IMPORTANT
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Brand Bazar",
    description: "Premium women's unstitched collection",
    images: ["https://brandbazarbymirsa.com/og-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={jost.variable} style={{ margin: 0, padding: 0, fontFamily: 'Jost, sans-serif' }}>
        <StoreHydration />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}