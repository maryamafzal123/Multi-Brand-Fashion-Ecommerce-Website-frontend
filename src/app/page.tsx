'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import api from '@/lib/axios';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    Promise.all([
      api.get('/api/products/'),
      api.get('/api/products/categories/'),
    ]).then(([productsRes, categoriesRes]) => {
      setProducts(productsRes.data.results || productsRes.data);
      setCategories(categoriesRes.data.results || categoriesRes.data);
    }).catch(() => {
      setProducts([]);
      setCategories([]);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category?.slug === filter);

  const marqueeItems = [
    'Nishat', '✦', 'Alkaram', '✦', 'Breeze', '✦',
    'Orient', '✦', 'Sapphire', '✦', 'Khaadi', '✦',
    'Regalia', '✦', 'Pareesa', '✦',
    'Nationwide Delivery', '✦', '100% Authentic', '✦',
  ];

  return (
    <>
      <style>{`
        /* ── Responsive styles ── */
        .new-arrivals-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 5vw;
          align-items: start;
        }
        .category-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6vw;
          align-items: center;
        }
        .about-bb-box {
          display: block;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
        }
        .footer-social-links {
          display: flex;
          gap: 0.8rem;
          align-items: center;
          flex-wrap: wrap;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .products-page-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* ── Tablet (768px) ── */
        @media (max-width: 1024px) {
          .new-arrivals-grid {
            grid-template-columns: 1fr 1.5fr;
            gap: 3vw;
          }
        }

        /* ── Mobile (767px and below) ── */
        @media (max-width: 767px) {
          .new-arrivals-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .category-cards-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 0.6rem !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-bb-box {
            display: none !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.8rem !important;
          }
          .footer-social-links {
            flex-wrap: wrap !important;
            gap: 0.8rem !important;
          }
          .footer-nav {
            gap: 1.5rem !important;
            flex-wrap: wrap !important;
          }
          .hero-section {
            padding: 2.5rem 5vw 4rem !important;
          }
          .new-arrivals-section {
            padding: 2.5rem 5vw !important;
          }
          .products-section {
            padding: 3rem 5vw 5rem !important;
          }
          .about-section {
            padding: 4rem 5vw !important;
          }
          .footer-main {
            padding: 3rem 5vw 2rem !important;
          }
          .cat-card-letter {
            font-size: 2rem !important;
          }
          .cat-card-name {
            font-size: 0.55rem !important;
          }
        }

        /* ── Small mobile (480px and below) ── */
        @media (max-width: 480px) {
          .category-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .hero-buttons a {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>

      <Navbar />
      <CartSidebar />
      <WhatsAppButton />

      {/* ── MARQUEE ── */}
      <div style={{ background: '#faf8f5', overflow: 'hidden', padding: '0.8rem 0', marginTop: "72px", borderTop: '0.5px solid rgba(184,150,12,0.2)', borderBottom: '0.5px solid rgba(184,150,12,0.2)' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8960c', padding: '0 2.5rem', flexShrink: 0 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,150,12,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,150,12,0.02) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="hero-section" style={{ padding: '3.5rem 8vw 5rem', width: '100%', maxWidth: '900px', animation: 'fadeUp 1s ease both', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '30px', height: '0.5px', background: '#b8960c' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#b8960c' }}>New Collection 2026</span>
            <div style={{ width: '30px', height: '0.5px', background: '#b8960c' }} />
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, color: '#111', letterSpacing: '0.04em', lineHeight: 1.08, marginBottom: '0.5rem' }}>
            Pakistan&apos;s Finest
          </h1>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, fontStyle: 'italic', color: '#b8960c', letterSpacing: '0.04em', lineHeight: 1.08, marginBottom: '2rem' }}>
            Brand Collections
          </h1>
          <div style={{ width: '200px', height: '1px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '1.5rem auto 2rem' }} />
          <p style={{ fontSize: '0.88rem', color: '#777', letterSpacing: '0.05em', lineHeight: 1.9, marginBottom: '3rem', maxWidth: '440px', textAlign: 'center', margin: '0 auto 3rem' }}>
            Nishat · Alkaram · Breeze · Orient · Regalia · Pareesa · Sapphire · Khaadi
            Shop premium unstitched from Pakistan&apos;s top brands — curated, authentic, delivered to your door.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="btn-gold">Shop Now</Link>
            <Link href="/#about" className="btn-outline-gold">Our Story</Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="products-section" style={{ padding: '5rem 6vw 7rem', background: '#faf8f5' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="sec-tag">✦ &nbsp; Our Collection &nbsp; ✦</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: '#111', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Shop by Brand</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
          <button onClick={() => setFilter('all')} className={`filter-btn${filter === 'all' ? ' active' : ''}`}>All</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setFilter(cat.slug)} className={`filter-btn${filter === cat.slug ? ' active' : ''}`}>{cat.name}</button>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', fontSize: '0.68rem', letterSpacing: '0.25em', color: '#b8960c', textTransform: 'uppercase' }}>Loading collection...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#ccc', fontStyle: 'italic' }}>No products found</p>
          </div>
        ) : (
          <>
  <style>{`
    .home-products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
    }
    @media (min-width: 768px) {
      .home-products-grid { grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
    }
    @media (min-width: 1024px) {
      .home-products-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    }
  `}</style>
  <div className="home-products-grid">
    {filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
  </div>
</>
        )}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link href="/products" className="btn-black">Shop All Brands</Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section" style={{ padding: '7rem 6vw', background: '#ffffff' }}>
        <div className="about-grid">
          {/* Left BB box — hidden on mobile via CSS */}
          <div className="about-bb-box" style={{ background: '#faf8f5', border: '0.5px solid rgba(184,150,12,0.3)', aspectRatio: '0.9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', opacity: 0.25 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(6rem, 12vw, 14rem)', fontWeight: 300, color: '#b8960c', lineHeight: 1, letterSpacing: '-0.05em' }}>BB</div>
            </div>
            <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem', borderTop: '0.5px solid rgba(184,150,12,0.25)', paddingTop: '1.2rem' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontStyle: 'italic', color: 'rgba(180,150,12,0.5)' }}>
                &quot;Every woman deserves the best brands.&quot;
              </p>
            </div>
          </div>

          {/* Right text */}
          <div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#b8960c', marginBottom: '1rem' }}>✦ &nbsp; Our Story</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: '#111', letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Your Favourite Brands,<br />
              <span style={{ color: '#b8960c', fontStyle: 'italic' }}>One Destination</span>
            </h2>
            <div style={{ width: '50px', height: '0.5px', background: '#b8960c', marginBottom: '1.8rem' }} />
            <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.9, marginBottom: '2.5rem', letterSpacing: '0.03em' }}>
              Brand Bazar by Mirsa is Pakistan&apos;s curated fashion destination — bringing you authentic unstitched collections from the country&apos;s most loved brands. From Nishat&apos;s signature prints to Sapphire&apos;s premium clothes, from Alkaram&apos;s everyday elegance to Khaadi&apos;s iconic designs — we bring it all to your doorstep.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { title: '100% Authentic', desc: 'Direct from authorised dealers — every piece is genuine' },
                { title: 'All Top Brands', desc: 'Nishat, Breeze, Alkaram, Pareesa, Sapphire, Regalia, Khaadi & more' },
                { title: 'Nationwide Delivery', desc: 'Fast & reliable delivery across all of Pakistan — COD available' },
                { title: 'Easy Returns', desc: '7-day hassle-free returns — shop with complete confidence' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '1rem', borderBottom: '0.5px solid rgba(0,0,0,0.06)', padding: '1rem 0' }}>
                  <span style={{ color: '#b8960c', fontSize: '0.7rem', marginTop: '0.2rem', flexShrink: 0 }}>✦</span>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '0.25rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)', padding: '2rem 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>© 2026 Brand Bazar. All rights reserved.</div>
      </footer>
    </>
  );
}
 
