import { useEffect, useMemo, useState } from 'react'
import { getOrdersForProduct, saveOrderForProduct } from '../lib/fakeDb'
import img1 from '../assets/Argetina1.jpg'
import img2 from '../assets/Atalanta.jpg'
import img3 from '../assets/Barcelona.jpg'
import img4 from '../assets/Brazil.jpg'
import img5 from '../assets/Football.avif'
import img6 from '../assets/Liver.jpg'
import img7 from '../assets/mancity.jpg'
import img8 from '../assets/Manunited.webp'
import img9 from '../assets/Messi.jpg'
import img10 from '../assets/Napoli.webp'
import img11 from '../assets/Portugal.webp'
import img12 from '../assets/RealMadrid.webp'
import img13 from '../assets/Ronaldo Special.jpg'

const ALL_PRODUCTS = [
  { id: 1, name: 'Argetina1', img: img1, price: 75 },
  { id: 2, name: 'Atalanta', img: img2, price: 68 },
  { id: 3, name: 'Barcelona', img: img3, price: 110 },
  { id: 4, name: 'Brazil', img: img4, price: 92 },
  { id: 5, name: 'Football', img: img5, price: 54 },
  { id: 6, name: 'Liver', img: img6, price: 88 },
  { id: 7, name: 'mancity', img: img7, price: 105 },
  { id: 8, name: 'Manunited', img: img8, price: 79 },
  { id: 9, name: 'Messi', img: img9, price: 120 },
  { id: 10, name: 'Napoli', img: img10, price: 64 },
  { id: 11, name: 'Portugal', img: img11, price: 99 },
  { id: 12, name: 'RealMadrid', img: img12, price: 112 },
  { id: 13, name: 'Ronaldo Special', img: img13, price: 115 },
]

export default function Products() {
  const [query, setQuery] = useState('')
  const [orderProduct, setOrderProduct] = useState(null)
  const [orderForm, setOrderForm] = useState({
    qty: 1,
    name: '',
    phone: '',
    address: '',
    payment: 'wishmoney',
  })

  useEffect(() => {
    const handler = (e) => setQuery((e.detail || '').toLowerCase())
    window.addEventListener('search', handler)
    return () => window.removeEventListener('search', handler)
  }, [])

  const products = useMemo(() => {
    if (!query) return ALL_PRODUCTS
    return ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query))
  }, [query])

  const closeOrder = () => {
    setOrderProduct(null)
    setOrderForm({ qty: 1, name: '', phone: '', address: '', payment: 'wishmoney' })
  }

  const updateField = (field, value) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }))
  }

  const submitOrder = (e) => {
    e.preventDefault()
    if (!orderProduct) return

    const cleanName = (orderForm.name || '').trim() || 'Anonymous'
    const payload = {
      qty: orderForm.qty,
      name: cleanName,
      phone: orderForm.phone.trim(),
      address: orderForm.address.trim(),
      payment: orderForm.payment,
      productId: orderProduct.id,
      productName: orderProduct.name,
      price: orderProduct.price,
      total: orderForm.qty * orderProduct.price,
    }

    saveOrderForProduct(orderProduct.name, payload)
    setOrderForm({ qty: 1, name: '', phone: '', address: '', payment: 'wishmoney' })
  }

  return (
    <>
      <h2 style={{ margin: '18px 0 10px' }}>Jerseys & Photos</h2>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.img} alt={p.name} />
            <div className="body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <strong style={{ fontSize: 14 }}>{p.name}</strong>
                <span style={{ fontWeight: 600 }}>${p.price}</span>
              </div>
              <button className="btn" style={{ padding: '6px 10px' }} onClick={() => setOrderProduct(p)}>
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <p style={{ marginTop: 16 }}>No results.</p>
      )}

      {orderProduct && (
        <div className="modal-backdrop" onClick={closeOrder}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Order {orderProduct.name}</h3>
            <form onSubmit={submitOrder}>
              <div>
                <label htmlFor="qty">Quantity</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={orderForm.qty}
                  onChange={(e) => updateField('qty', Math.max(1, Number(e.target.value) || 1))}
                />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={orderForm.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+961..."
                  value={orderForm.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Street, city"
                  value={orderForm.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="payment">Payment method</label>
                <select
                  id="payment"
                  value={orderForm.payment}
                  onChange={(e) => updateField('payment', e.target.value)}
                >
                  <option value="wishmoney">Wishmoney</option>
                  <option value="paypal">PayPal</option>
                  <option value="omt">OMT</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn secondary" onClick={closeOrder}>Cancel</button>
                <button type="submit" className="btn">Save order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
