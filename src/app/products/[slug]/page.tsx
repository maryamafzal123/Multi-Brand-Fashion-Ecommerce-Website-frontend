'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Product, ProductVariant } from '@/types';
import { useCartStore } from '@/store/cartStore';
import api from '@/lib/axios';
import ProductCard from '@/components/ProductCard';

const isVideo = (url: string) => /\.(mp4|mov|avi|webm|mkv)$/i.test(url);

function RelatedProducts({ categorySlug, currentSlug }: { categorySlug?: string; currentSlug: string }) {
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (!categorySlug) return;
    api.get(`/api/products/?category=${categorySlug}`)
      .then(res => {
        const all = res.data.results || res.data;
        setRelated(all.filter((p: Product) => p.slug !== currentSlug).slice(0, 4));
      })
      .catch(() => {});
  }, [categorySlug, currentSlug]);

  if (related.length === 0) return null;

  return (
    <section style={{ padding: '4rem 6vw 6rem', background: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.62rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#b8960c', marginBottom: '0.6rem' }}>
          You May Also Like
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, color: '#111', letterSpacing: '0.06em' }}>
          More From This Collection
        </h2>
        <div style={{ width: '50px', height: '0.5px', background: '#b8960c', margin: '1rem auto 0' }} />
      </div>
<>
  <style>{`
    .related-products-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
    }
    @media (min-width: 768px) {
      .related-products-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    }
  `}</style>
  <div className="related-products-grid">
    {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
  </div>
</>
    </section>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${slug}/`);
        setProduct(res.data);
        const images = res.data.images || [];
        const firstVideo = images.find((img: { image: string }) => /\.(mp4|mov|avi|webm|mkv)$/i.test(img.image));
        setSelectedImage(firstVideo ? firstVideo.image : res.data.primary_image);
      } catch {
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, router]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!product.in_stock) { toast.error('This item is out of stock!'); return; }
    let added = false;
    for (let i = 0; i < quantity; i++) {
      added = addItem(product, selectedVariant || undefined);
      if (!added) break;
    }
    if (added) {
      toast.success(`${product.name} added to bag ✓`);
    } else {
      const stock = product.stock ?? 0;
      if (stock <= 0) { toast.error('This item is out of stock!'); }
      else { toast.error(`Max quantity reached! Only ${stock} available.`); }
    }
  };

  const finalPrice = product ? Number(product.price) + (selectedVariant ? Number(selectedVariant.extra_price) : 0) : 0;
  const isHeading = (line: string) => /^(Shirt|Dupatta|Trouser|Kameez|Shalwar|Trousers)$/i.test(line.trim());

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f5' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#b8960c', fontStyle: 'italic' }}>Loading...</p>
    </div>
  );

  if (!product) return null;

  return (
    <>
      <style>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5vw;
          padding: 2rem 6vw 7rem;
        }
        .product-main-image {
          height: 580px;
        }
        @media (max-width: 767px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            padding: 1rem 5vw 4rem !important;
            gap: 1.5rem !important;
          }
          .product-main-image {
            height: 380px !important;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .product-main-image {
            height: 320px !important;
          }
        }
      `}</style>

      <Navbar />
      <CartSidebar />
      <WhatsAppButton />

      <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#faf8f5' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '1.5rem 6vw', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8960c' }}>
          <Link href="/" style={{ color: '#b8960c', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/products" style={{ color: '#b8960c', textDecoration: 'none' }}>Collection</Link>
          {' / '}
          <span style={{ color: '#111' }}>{product.name}</span>
        </div>

        {/* Main Content */}
        <div className="product-detail-grid">

          {/* LEFT — Images */}
          <div>
            {/* Main Image */}
            <div className="product-main-image" style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #f5f0e8, #faf8f5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', overflow: 'hidden',
            }}>
              {selectedImage ? (
                isVideo(selectedImage) ? (
                  <video src={selectedImage} controls loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image src={selectedImage} alt={product.name} fill style={{ objectFit: 'cover' }} />
                )
              ) : (
                <span style={{ fontSize: '8rem', opacity: 0.4 }}>👗</span>
              )}
              {product.discount_percent > 0 && (
                <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#b8960c', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.4rem 1rem' }}>
                  -{product.discount_percent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {product.images.map((img) => (
                  <div key={img.id} onClick={() => setSelectedImage(img.image)}
                    style={{ width: '80px', height: '80px', position: 'relative', cursor: 'pointer', border: selectedImage === img.image ? '2px solid #b8960c' : '2px solid transparent', overflow: 'hidden', background: '#faf8f5' }}>
                    {isVideo(img.image) ? (
                      <video src={img.image} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image src={img.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product Info */}
          <div>
            {product.category && (
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8960c', marginBottom: '0.8rem' }}>
                {product.category.name}
              </p>
            )}
            <h1 style={{ fontFamily: "'Jost', sans-serif", fontSize: '1.3rem', fontWeight: 500, color: '#111', lineHeight: 1.3, marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {product.name}
            </h1>
            {product.age_range && (
              <p style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8b5e3c', marginBottom: '1.5rem' }}>
                Age: {product.age_range} years
              </p>
            )}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '1rem', fontWeight: 400, color: '#b8960c', letterSpacing: '0.05em' }}>
                Rs. {finalPrice.toLocaleString()}
              </span>
              {product.old_price && (
                <span style={{ fontSize: '1.1rem', color: '#aaa', textDecoration: 'line-through', marginLeft: '1rem' }}>
                  Rs. {Number(product.old_price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(196,169,125,0.2)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {(product.description || '').split('\n').map((line, i) =>
                line.trim() === '' ? <div key={i} style={{ height: '0.6rem' }} /> :
                isHeading(line) ? (
                  <p key={i} style={{ margin: 0, marginTop: '0.6rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#111' }}>{line.trim()}</p>
                ) : (
                  <p key={i} style={{ margin: 0, fontSize: '0.88rem', fontWeight: 300, color: '#7a6458', lineHeight: 1.8 }}>{line}</p>
                )
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#111', marginBottom: '0.8rem' }}>Select Size / Color</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {product.variants.map((variant) => (
                    <button key={variant.id} onClick={() => setSelectedVariant(selectedVariant?.id === variant.id ? null : variant)} disabled={variant.stock === 0}
                      style={{ padding: '0.5rem 1.2rem', fontSize: '0.78rem', background: selectedVariant?.id === variant.id ? '#111' : 'transparent', color: selectedVariant?.id === variant.id ? '#faf8f5' : '#111', border: selectedVariant?.id === variant.id ? '1px solid #111' : '1px solid rgba(58,42,32,0.25)', cursor: variant.stock === 0 ? 'not-allowed' : 'pointer', opacity: variant.stock === 0 ? 0.4 : 1, transition: 'all 0.2s' }}>
                      {variant.size}{variant.color && ` / ${variant.color}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#111', marginBottom: '0.8rem' }}>Quantity</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', background: '#faf8f5', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#111' }}>−</button>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '1.1rem', fontWeight: 500, minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => { const maxStock = product.stock ?? 0; if (quantity >= maxStock) { toast.error(`Max quantity reached! Only ${maxStock} available.`); return; } setQuantity(quantity + 1); }}
                  style={{ width: '36px', height: '36px', background: '#faf8f5', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#111' }}>+</button>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: product.in_stock ? '#5a9a6a' : '#b8960c', marginBottom: '1.5rem' }}>
              {product.in_stock ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
            </p>

            <button onClick={handleAddToCart} disabled={!product.in_stock}
              style={{ width: '100%', padding: '1.1rem', background: product.in_stock ? '#111' : '#ccc', color: '#faf8f5', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', cursor: product.in_stock ? 'pointer' : 'not-allowed', marginBottom: '1rem', transition: 'background 0.3s' }}
              onMouseEnter={e => { if (product.in_stock) (e.currentTarget as HTMLButtonElement).style.background = '#b8960c'; }}
              onMouseLeave={e => { if (product.in_stock) (e.currentTarget as HTMLButtonElement).style.background = '#111'; }}>
              {product.in_stock ? 'Add to Bag' : 'Out of Stock'}
            </button>

            <a href={`https://wa.me/923336262574?text=Hi! I want to order: ${product.name}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', padding: '1.1rem', background: '#25d366', color: '#fff', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
              💬 Order via WhatsApp
            </a>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(196,169,125,0.2)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[{ icon: '🚚', text: 'Free delivery on orders over Rs. 3,000' }, { icon: '↩️', text: 'Easy returns within 7 days' }, { icon: '✨', text: 'Premium quality guaranteed' }].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.82rem', color: '#7a6458' }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts categorySlug={product.category?.slug} currentSlug={product.slug} />

      <footer style={{ background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)', padding: '2rem 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.95rem', fontWeight: 300, letterSpacing: '0.4em', lineHeight: 1 }}>
            <span style={{ color: '#fff' }}>BRAND</span>{' '}<span style={{ color: '#b8960c' }}>BAZAR</span>
          </div>
          <div style={{ width: '70px', height: '0.5px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '5px auto' }} />
          <div style={{ fontSize: '0.42rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#b8960c' }}>BY MIRSA</div>
        </div>
        <div style={{ fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em' }}>© 2026 Brand Bazar. All rights reserved.</div>
      </footer>
    </>
  );
}
