'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import api from '@/lib/axios';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

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

  const filtered = products
    .filter(p => {
      const matchCat = filter === 'all' || p.category?.slug === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return Number(a.price) - Number(b.price);
      if (sort === 'price-desc') return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <>
      {/* ── ALL STYLES IN ONE PLACE ── */}
      <style>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.8rem;
        }
        @media (min-width: 768px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        }
        @media (min-width: 1024px) {
          .products-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 2px;
        }
      `}</style>

      <Navbar />
      <CartSidebar />
      <WhatsAppButton />

      {/* Header */}
      <div style={{ paddingTop: '72px', background: '#fff', borderBottom: '0.5px solid #e8e4de' }}>
        <div style={{ padding: 'clamp(1.5rem, 4vw, 4rem) 6vw 2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#111', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#111', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
              onMouseLeave={e => (e.currentTarget.style.color = '#999')}
            >Home</Link>
            &nbsp;›&nbsp; All Brands
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 3vw, 3rem)', fontWeight: 300, color: '#111', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            Shop By Brand
          </h1>
          <div style={{ width: '100%', maxWidth: '200px', height: '0.7px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '0.8rem auto 0' }} />
        </div>

        {/* Filters + Sort bar */}
        <div style={{ padding: '0 6vw 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginRight: '0.5rem' }}>Filter +</span>
            <button onClick={() => setFilter('all')} className={`filter-btn${filter === 'all' ? ' active' : ''}`}>All Brands</button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilter(cat.slug)} className={`filter-btn${filter === cat.slug ? ' active' : ''}`}>{cat.name}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: '0.45rem 1rem', border: '0.5px solid #e8e4de', background: '#faf8f5', color: '#111', fontSize: '0.78rem', outline: 'none', fontFamily: 'Jost, sans-serif', width: '180px' }} />
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: '0.45rem 1rem', border: '0.5px solid #e8e4de', background: '#fff', color: '#111', fontSize: '0.72rem', letterSpacing: '0.12em', outline: 'none', fontFamily: 'Jost, sans-serif', cursor: 'pointer' }}>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '3rem 6vw 7rem', background: '#faf8f5', minHeight: '60vh' }}>
        {loading ? (
          <>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: '#b8960c', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
              Loading collection...
            </p>
            <div className="products-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ background: '#fff', border: '0.5px solid #f0ede8' }}>
                  <div className="skeleton" style={{ aspectRatio: '0.8', width: '100%' }} />
                  <div style={{ padding: '1rem' }}>
                    <div className="skeleton" style={{ height: '10px', width: '40%', marginBottom: '0.5rem' }} />
                    <div className="skeleton" style={{ height: '14px', width: '80%', marginBottom: '0.5rem' }} />
                    <div className="skeleton" style={{ height: '12px', width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#ccc', fontStyle: 'italic', marginBottom: '0.5rem' }}>No products found</p>
            <p style={{ fontSize: '0.78rem', color: '#aaa', letterSpacing: '0.1em' }}>Try a different filter or search term</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.65rem', color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem', fontFamily: "'Jost', sans-serif" }}>
              {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="products-grid">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)', padding: '2rem 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.95rem', fontWeight: 300, letterSpacing: '0.4em', lineHeight: 1 }}>
            <span style={{ color: '#fff' }}>BRAND</span>{' '}<span style={{ color: '#b8960c' }}>BAZAR</span>
          </div>
          <div style={{ width: '70px', height: '0.5px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '5px auto', display: 'block' }} />
          <div style={{ fontSize: '0.42rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c' }}>BY MIRSA</div>
        </div>
        <div style={{ fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em' }}>Pakistan&#39;s Most Trusted Multi-Brand Fashion Store</div>
      </footer>
    </>
  );
}
