'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { Address } from '@/types';
import api from '@/lib/axios';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [step, setStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [loading, setLoading] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    street: '',
    city: '',
    province: '',
    postal_code: '',
    is_default: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/auth/addresses/').then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setAddresses(data);
        const def = data.find((a: Address) => a.is_default);
        if (def) setSelectedAddress(def.id);
      }).catch(() => {});
    }
  }, [isAuthenticated]);

  const handleAddAddress = async () => {
    try {
      const res = await api.post('/api/auth/addresses/', newAddress);
      setAddresses([...addresses, res.data]);
      setSelectedAddress(res.data.id);
      setShowAddAddress(false);
      toast.success('Address saved!');
    } catch {
      toast.error('Failed to save address.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first!');
      router.push('/auth/login');
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address!');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((item) => ({
        product_id: item.id,
        variant_id: item.variant?.id || null,
        quantity: item.quantity,
      }));
      await api.post('/api/orders/', {
        shipping_address_id: selectedAddress,
        payment_method: paymentMethod,
        items: orderItems,
      });
      clearCart();
      if (paymentMethod === 'cod') {
        toast.success('Order placed successfully!');
      } else {
        toast.success('Order placed! Please send payment screenshot on WhatsApp.');
      }
      router.push('/orders');
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    background: '#faf8f5',
    border: '1px solid rgba(196,169,125,0.3)',
    color: '#111', fontSize: '0.88rem',
    outline: 'none', fontFamily: 'Jost, sans-serif',
  };

  const delivery = 200;
  const subtotal = getTotalPrice();
  const total = subtotal + (subtotal >= 3000 ? 0 : delivery);

  return (
    <>
      <Navbar />
      <CartSidebar />

      <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#faf8f5' }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8 0%, #faf8f5 100%)',
          padding: '5rem 6vw 3rem',
        }}>
          <p style={{
            fontSize: '0.7rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#b8960c', marginBottom: '0.9rem',
          }}>{'✦ Checkout'}</p>
          <h1 style={{
            fontFamily: "'Jost', sans-serif",
fontWeight: 400,            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300, color: '#111',
          }}>
            {step === 'cart' ? 'Your Bag' : step === 'address' ? 'Delivery Address' : 'Payment'}
          </h1>

          {/* Steps */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
            {['cart', 'address', 'payment'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 600,
                  background: step === s ? '#b8960c' :
                    ['cart', 'address', 'payment'].indexOf(step) > i ? '#b8960c' : 'rgba(58,42,32,0.15)',
                  color: step === s || ['cart', 'address', 'payment'].indexOf(step) > i ? '#fff' : '#aaa',
                }}>
                  {['cart', 'address', 'payment'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                <span style={{
                  fontSize: '0.72rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: step === s ? '#111' : '#aaa',
                }}>
                  {s === 'cart' ? 'Bag' : s === 'address' ? 'Address' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 380px',
          gap: '3rem', padding: '3rem 6vw 6rem',
          alignItems: 'start',
        }}>
          {/* LEFT SIDE */}
          <div>
            {/* STEP 1: CART */}
            {step === 'cart' && (
              <div>
                {items.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '1.8rem', fontStyle: 'italic', color: '#aaa',
                      marginBottom: '1rem',
                    }}>
                      Your bag is empty
                    </p>
                    <Link href="/products" className="btn-primary">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={`${item.id}-${item.variant?.id}`} style={{
                      display: 'flex', gap: '1.5rem', padding: '1.5rem 0',
                      borderBottom: '1px solid rgba(196,169,125,0.15)',
                      alignItems: 'center',
                    }}>
                      <div style={{
                        width: '100px', height: '100px', flexShrink: 0,
                        background: 'linear-gradient(135deg, #f5f0e8, #faf8f5)',
                        overflow: 'hidden', position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '2.5rem' }}>{'👗'}</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: '0.95rem', fontWeight: 400, color: '#111', marginBottom: '0.3rem',
                        }}>
                          {item.name}
                        </p>
                        {item.variant && (
                          <p style={{ fontSize: '0.72rem', color: '#b8960c', marginBottom: '0.3rem' }}>
                            {item.variant.size}{item.variant.color && ` / ${item.variant.color}`}
                          </p>
                        )}
                        {item.age_range && (
                          <div style={{ fontSize: '0.8rem', color: '#8b5e3c' }}>
                            Age: {item.age_range} yrs
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.id)}
                            style={{ width: '28px', height: '28px', background: '#faf8f5', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                            −
                          </button>
                          <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.id)}
                            style={{ width: '28px', height: '28px', background: '#faf8f5', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                            +
                          </button>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ color: '#b8960c', fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button onClick={() => removeItem(item.id, item.variant?.id)}
                          style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
                {items.length > 0 && (
                  <button onClick={() => {
                    if (!isAuthenticated) { toast.error('Please login first!'); router.push('/auth/login'); return; }
                    setStep('address');
                  }} style={{
                    marginTop: '2rem', padding: '1rem 3rem',
                    background: '#111', color: '#faf8f5',
                    fontSize: '0.78rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  }}>
                    Continue to Address
                  </button>
                )}
              </div>
            )}

            {/* STEP 2: ADDRESS */}
            {step === 'address' && (
              <div>
                {addresses.map((addr) => (
                  <div key={addr.id} onClick={() => setSelectedAddress(addr.id)} style={{
                    padding: '1.5rem', marginBottom: '1rem', cursor: 'pointer',
                    border: selectedAddress === addr.id
                      ? '2px solid #b8960c' : '1px solid rgba(196,169,125,0.3)',
                    background: selectedAddress === addr.id ? 'rgba(201,150,122,0.05)' : '#fff',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#b8960c' }}>
                        {addr.label}
                      </span>
                      {selectedAddress === addr.id && (
                        <span style={{ color: '#b8960c', fontSize: '0.8rem' }}>{'✓ Selected'}</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#111', lineHeight: 1.6 }}>
                      {addr.street}, {addr.city}, {addr.province}
                    </p>
                  </div>
                ))}

                {!showAddAddress ? (
                  <button onClick={() => setShowAddAddress(true)} style={{
                    padding: '0.8rem 1.5rem', background: 'transparent',
                    border: '1px dashed rgba(196,169,125,0.5)',
                    color: '#b8960c', fontSize: '0.78rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    cursor: 'pointer', width: '100%', marginBottom: '2rem',
                  }}>
                    + Add New Address
                  </button>
                ) : (
                  <div style={{
                    padding: '1.5rem', border: '1px solid rgba(196,169,125,0.3)',
                    marginBottom: '2rem', background: '#fff',
                  }}>
                    <p style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '1rem' }}>
                      New Address
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {[
                        { key: 'street', placeholder: 'Street Address' },
                        { key: 'city', placeholder: 'City (e.g. Vehari)' },
                        { key: 'province', placeholder: 'Province (e.g. Punjab)' },
                        { key: 'postal_code', placeholder: 'Postal Code (optional)' },
                      ].map((field) => (
                        <input key={field.key} placeholder={field.placeholder}
                          value={newAddress[field.key as keyof typeof newAddress] as string}
                          onChange={(e) => setNewAddress({ ...newAddress, [field.key]: e.target.value })}
                          style={inputStyle}
                        />
                      ))}
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleAddAddress} style={{
                          flex: 1, padding: '0.9rem',
                          background: '#111', color: '#faf8f5',
                          fontSize: '0.75rem', letterSpacing: '0.15em',
                          textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                        }}>Save Address</button>
                        <button onClick={() => setShowAddAddress(false)} style={{
                          padding: '0.9rem 1.5rem', background: 'transparent',
                          color: '#111', fontSize: '0.75rem',
                          letterSpacing: '0.15em', textTransform: 'uppercase',
                          border: '1px solid rgba(58,42,32,0.2)', cursor: 'pointer',
                        }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setStep('cart')} style={{
                    padding: '1rem 2rem', background: 'transparent',
                    color: '#111', fontSize: '0.78rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    border: '1px solid rgba(58,42,32,0.2)', cursor: 'pointer',
                  }}>
                    Back
                  </button>
                  <button onClick={() => {
                    if (!selectedAddress) { toast.error('Please select an address!'); return; }
                    setStep('payment');
                  }} style={{
                    flex: 1, padding: '1rem',
                    background: '#111', color: '#faf8f5',
                    fontSize: '0.78rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  }}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 'payment' && (
              <div>
                <p style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '1.5rem' }}>
                  Select Payment Method
                </p>

                {[
                  { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '🚚' },
                  { value: 'bank', label: 'Bank Transfer', desc: 'Transfer to our bank account', icon: '🏦' },
                ].map((method) => (
                  <div key={method.value}
                    onClick={() => setPaymentMethod(method.value as 'cod' | 'bank')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1.2rem',
                      padding: '1.2rem 1.5rem', marginBottom: '1rem', cursor: 'pointer',
                      border: paymentMethod === method.value
                        ? '2px solid #b8960c' : '1px solid rgba(196,169,125,0.3)',
                      background: paymentMethod === method.value ? 'rgba(201,150,122,0.05)' : '#fff',
                      transition: 'all 0.2s',
                    }}>
                    <span style={{ fontSize: '1.8rem' }}>{method.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.88rem', fontWeight: 500, color: '#111', marginBottom: '0.2rem' }}>
                        {method.label}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#8b5e3c' }}>{method.desc}</p>
                    </div>
                    {paymentMethod === method.value && (
                      <span style={{ color: '#b8960c', fontSize: '1rem' }}>{'✓'}</span>
                    )}
                  </div>
                ))}

                {/* Bank Transfer Details */}
                {paymentMethod === 'bank' && (
                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(196,169,125,0.08)',
                    border: '1px solid rgba(196,169,125,0.3)',
                    marginBottom: '1rem',
                  }}>
                    <p style={{
                      fontSize: '0.72rem', letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: '#b8960c',
                      marginBottom: '1rem',
                    }}>
                      Bank Account Details
                    </p>
                    {[
                      { label: 'Bank Name', value: 'Askari Bank' },
                      { label: 'Account Title', value: 'ISHAM IJAZ' },
                      { label: 'Account Number', value: '00930320213087' },
                      // { label: 'IBAN', value: 'PK00MEZN0001234567890123' },
                    ].map((detail) => (
                      <div key={detail.label} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '0.6rem 0',
                        borderBottom: '1px solid rgba(196,169,125,0.15)',
                        fontSize: '0.85rem',
                      }}>
                        <span style={{ color: '#8b5e3c' }}>{detail.label}</span>
                        <span style={{ color: '#111', fontWeight: 500 }}>{detail.value}</span>
                      </div>
                    ))}
                    <div style={{
                      marginTop: '1rem', padding: '0.8rem',
                      background: 'rgba(37,211,102,0.08)',
                      border: '1px solid rgba(37,211,102,0.2)',
                      fontSize: '0.78rem', color: '#10b981',
                      lineHeight: 1.6,
                    }}>
                      {'After transfer, send payment screenshot on WhatsApp:'}
                      <br />
                      <strong>+92 333 6262574</strong>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button onClick={() => setStep('address')} style={{
                    padding: '1rem 2rem', background: 'transparent',
                    color: '#111', fontSize: '0.78rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    border: '1px solid rgba(58,42,32,0.2)', cursor: 'pointer',
                  }}>
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={loading} style={{
                    flex: 1, padding: '1rem',
                    background: loading ? '#b8960c' : '#111',
                    color: '#faf8f5', fontSize: '0.78rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.3s',
                  }}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div style={{
            background: '#fff', padding: '2rem',
            border: '1px solid rgba(196,169,125,0.2)',
            position: 'sticky', top: '100px',
          }}>
            <p style={{
              fontSize: '0.78rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#111',
              marginBottom: '1.5rem', paddingBottom: '1rem',
              borderBottom: '1px solid rgba(196,169,125,0.2)',
            }}>
              Order Summary
            </p>

            {items.map((item) => (
              <div key={`${item.id}-${item.variant?.id}`} style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '0.8rem', fontSize: '0.85rem',
              }}>
                <span style={{ color: '#8b5e3c', flex: 1, marginRight: '1rem' }}>
                  {item.name} {'\u00d7'} {item.quantity}
                </span>
                <span style={{ color: '#111', flexShrink: 0 }}>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(196,169,125,0.2)', marginTop: '1rem', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#8b5e3c' }}>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                <span style={{ color: '#8b5e3c' }}>Delivery</span>
                <span style={{ color: subtotal >= 3000 ? '#10b981' : '#111' }}>
                  {subtotal >= 3000 ? 'FREE' : `Rs. ${delivery}`}
                </span>
              </div>
              {subtotal >= 3000 && (
                <p style={{ fontSize: '0.72rem', color: '#10b981', marginBottom: '0.6rem' }}>
                  {'✓ You qualify for free delivery!'}
                </p>
              )}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                paddingTop: '1rem', borderTop: '1px solid rgba(196,169,125,0.2)',
                fontFamily: "'Jost', sans-serif", fontSize: '1rem', fontWeight: 500,
              }}>
                <span>Total</span>
                <span style={{ color: '#b8960c' }}>Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem', padding: '0.8rem',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ fontSize: '1rem' }}>{'🚚'}</span>
              <span style={{ fontSize: '0.72rem', color: '#10b981', letterSpacing: '0.08em' }}>
                Cash on Delivery available
              </span>
            </div>
          </div>
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