'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import { Order } from '@/types';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const res = await api.get('/api/orders/');
        setOrders(res.data.results || res.data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, router]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending:    '#f59e0b',
      confirmed:  '#3b82f6',
      processing: '#8b5cf6',
      shipped:    '#06b6d4',
      delivered:  '#10b981',
      cancelled:  '#ef4444',
      refunded:   '#6b7280',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <>
      <Navbar />
      <CartSidebar />

      <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
  {/* Header */}
  <div style={{ paddingTop: '72px', background: '#fff', borderBottom: '0.5px solid #e8e4de' }}>
    <div style={{ padding: '4rem 6vw 2.5rem' }}>
      
      <h1 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1rem, 3vw, 3rem)',
        fontWeight: 300, color: '#111',
        letterSpacing: '0.07em', textTransform: 'uppercase',
      }}>
        My Orders
      </h1>
    </div>
  </div>

        {/* Content */}
        <div style={{ padding: '4rem 6vw' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#b8960c' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.5rem', fontStyle: 'italic',
              }}>
                Loading your orders...
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2rem', fontStyle: 'italic',
                color: '#aaa', marginBottom: '1rem',
              }}>
                No orders yet
              </p>
              <p style={{
                fontSize: '0.88rem', color: '#8b5e3c',
                marginBottom: '2rem',
              }}>
                You haven&apos;t placed any orders yet.
              </p>
              <Link href="/products" style={{
                display: 'inline-block', padding: '0.9rem 2.4rem',
                background: '#111', color: '#faf8f5',
                fontSize: '0.78rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {orders.map((order) => (
                <div key={order.id} style={{
                  background: '#fff',
                  border: '1px solid rgba(196,169,125,0.2)',
                  overflow: 'hidden',
                }}>
                  {/* Order Header */}
                  <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid rgba(196,169,125,0.15)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
                    background: '#faf8f5',
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.7rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: '#b8960c',
                        marginBottom: '0.3rem',
                      }}>
                      {order.order_number}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#8b5e3c' }}>
                        {new Date(order.created_at).toLocaleDateString('en-PK', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      {/* Status Badge */}
                      <span style={{
                        padding: '0.3rem 1rem',
                        fontSize: '0.68rem', letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        background: getStatusColor(order.status) + '20',
                        color: getStatusColor(order.status),
                        border: `1px solid ${getStatusColor(order.status)}40`,
                      }}>
                        {order.status}
                      </span>

                      {/* Payment Status */}
                      <span style={{
                        fontSize: '0.72rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: order.payment_status === 'paid' ? '#10b981' : '#f59e0b',
                      }}>
                        {order.payment_status === 'paid' ? '✓ Paid' : '⏳ Unpaid'}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: '1.5rem 2rem' }}>
                    {order.items.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', padding: '0.8rem 0',
                        borderBottom: '1px solid rgba(196,169,125,0.1)',
                        gap: '1rem',
                      }}>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: '0.9rem', fontWeight: 400, color: '#111',
                              marginBottom: '0.4rem',

                          }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: '#8b5e3c' }}>
                            Qty: {item.quantity} × Rs. {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                        <p style={{
                          fontWeight: 500, color: '#b8960c',
                          fontSize: '0.95rem', flexShrink: 0,
                        }}>
                          Rs. {Number(item.subtotal).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div style={{
                    padding: '1.2rem 2rem',
                    borderTop: '1px solid rgba(196,169,125,0.15)',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                    background: '#faf8f5',
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#8b5e3c' }}>
                      Payment: {order.payment_method.toUpperCase()}
                      {' · '}
                      Delivery: Rs. {Number(order.delivery_charge).toLocaleString()}
                    </div>
                   <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.95rem', fontWeight: 400, color: '#111',
              }}>
                Total:{' '}
                <span style={{ color: '#b8960c', fontWeight: 500 }}>
                  Rs. {Number(order.total).toLocaleString()}
                </span>
                </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
  background: '#111', borderTop: '0.5px solid rgba(184,150,12,0.2)',
  padding: '2rem 6vw', display: 'flex',
  alignItems: 'center', justifyContent: 'space-between',
  flexWrap: 'wrap', gap: '1rem',
}}>
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
  <span style={{ color: '#fff' }}>BRAND </span>
  <span style={{ color: '#b8960c' }}>BAZAR</span>
</div>
<div style={{ height: '0.5px', background: 'linear-gradient(to right, transparent, #b8960c, transparent)', margin: '3px auto', width: '70px' }} />
<div style={{ fontSize: '0.4rem', letterSpacing: '0.35em', color: '#b8960c', textTransform: 'uppercase' }}>BY MIRSA</div>
  </div>
  <div style={{ fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em' }}>© 2026 Brand Bazar. All rights reserved.</div>
</footer>
    </>
  );
}