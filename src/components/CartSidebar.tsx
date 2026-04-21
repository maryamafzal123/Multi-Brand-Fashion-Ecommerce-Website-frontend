'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CartSidebar() {
  const {
    items, isOpen, closeCart,
    removeItem, updateQuantity,
    getTotalPrice, clearCart,
  } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

const handleCheckout = () => {
  router.push('/cart');
  closeCart();
};

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={closeCart} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(30,20,15,0.55)',
        zIndex: 999,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'opacity 0.35s',
      }} />

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 95vw)',
        background: '#faf8f5',
        zIndex: 1000,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.8,0.25,1)',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid rgba(196,169,125,0.3)',
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid rgba(196,169,125,0.25)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.6rem', fontWeight: 300,
          }}>
            Your Bag
          </span>
          <button onClick={closeCart} style={{
            background: 'none', border: 'none',
            fontSize: '1.4rem', cursor: 'pointer',
            color: '#111',
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '4rem 0',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.2rem', color: '#aaa', fontStyle: 'italic',
            }}>
              {'Your bag is empty 🌸'}
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant?.id}`} style={{
                display: 'flex', gap: '1.2rem',
                padding: '1.2rem 0',
                borderBottom: '1px solid rgba(196,169,125,0.15)',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '70px', height: '70px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #f5f0e8, #faf8f5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                }}>
                  {item.image ? (
                    <Image
                      src={item.image} alt={item.name}
                      width={70} height={70}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.8rem' }}>{'👗'}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.9rem', fontWeight: 400,
                }}>
                  {item.name}
                </div>
                  {item.variant && (
                    <div style={{ fontSize: '0.7rem', color: '#b8960c' }}>
                      {item.variant.size}{item.variant.color && ` / ${item.variant.color}`}
                    </div>
                  )}
                  <div style={{
                    color: '#b8960c', fontWeight: 500,
                    fontSize: '0.9rem', marginTop: '0.3rem',
                  }}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '0.6rem', marginTop: '0.5rem',
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.id)}
                      style={{
                        width: '24px', height: '24px',
                        background: '#faf8f5', border: 'none',
                        cursor: 'pointer', fontSize: '1rem',
                      }}>−</button>
                    <span style={{ fontSize: '0.85rem' }}>{item.quantity}</span>
                    <button
  onClick={() => {
    const result = updateQuantity(item.id, item.quantity + 1, item.variant?.id);
    if (!result) {
      toast.error(`Max quantity reached! Only ${item.stock} available.`);
    }
  }}
  style={{
    width: '24px', height: '24px',
    background: '#faf8f5', border: 'none',
    cursor: 'pointer', fontSize: '1rem',
  }}>+</button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id, item.variant?.id)}
                  style={{
                    background: 'none', border: 'none',
                    color: '#ccc', fontSize: '1.1rem',
                    cursor: 'pointer', flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#b8960c')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem 2rem',
          borderTop: '1px solid rgba(196,169,125,0.25)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.35rem', marginBottom: '1.4rem',
          }}>
            <span style={{
              fontSize: '0.75rem', letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Jost, sans-serif',
            }}>Total</span>
            <span style={{ color: '#b8960c', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
              Rs. {getTotalPrice().toLocaleString()}
            </span>
          </div>
          <button onClick={handleCheckout} style={{
            width: '100%', padding: '1rem',
            background: '#111', color: '#faf8f5',
            fontSize: '0.78rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', border: 'none',
            cursor: 'pointer', transition: 'background 0.3s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b8960c')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111')}
          >
            Proceed to Checkout
          </button>

          {items.length > 0 && (
            <button onClick={clearCart} style={{
              width: '100%', padding: '0.6rem',
              background: 'none', color: '#aaa',
              fontSize: '0.7rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', border: 'none',
              cursor: 'pointer', marginTop: '0.8rem',
            }}>
              Clear Bag
            </button>
          )}
        </div>
      </div>
    </>
  );
}