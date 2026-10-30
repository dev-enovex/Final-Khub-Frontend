import React, { useState } from 'react';
import { CheckCircle2, MapPin, ChevronRight } from 'lucide-react';
import styles from './DeliveryDetailsPage.module.css';

const money = value => `₦${Number(value).toLocaleString('en-NG')}`;
export default function DeliveryDetailsPage({ user, onNavigate, onContinue }) {
  const [recipient, setRecipient] = useState(user?.name || 'Tomi Adeyemi');
  const [phone, setPhone] = useState(user?.phone || '+234 803 000 1428');
  const [street, setStreet] = useState('12 Admiralty Way, Flat 3B');
  const [city, setCity] = useState('Lagos / Lekki');
  const [postal, setPostal] = useState('106104');
  const [saveAddress, setSaveAddress] = useState(true);
  const [delivery, setDelivery] = useState('standard');
  const [instructions, setInstructions] = useState('Call at the gate; reception is open until 6 PM.');
  const [error, setError] = useState('');
  const fee = delivery === 'standard' ? 4000 : 0;
  const subtotal = 203000;
  const total = subtotal + fee;
  const proceed = () => {
    if (!recipient.trim() || !phone.trim() || !street.trim() || !city.trim() || !postal.trim()) {
      setError('Please complete all required delivery details before continuing.');
      return;
    }
    setError('');
    onContinue({ recipient, phone, street, city, postal, saveAddress, delivery, instructions, deliveryFee: fee, total });
  };
  return <div className={styles.page}>
    <header className={styles.header}>
      <a href="#top" onClick={e=>{e.preventDefault();onNavigate('home')}} className={styles.logo}>KHUB</a>
      <nav><button onClick={()=>onNavigate('discover')}>Discover</button><button onClick={()=>onNavigate('shop')}>Shop</button><button onClick={()=>onNavigate('rentals')}>Rent</button><button onClick={()=>onNavigate('services')}>Services</button><button onClick={()=>onNavigate('jobs')}>Jobs</button><button onClick={()=>onNavigate('city')}>Rides &amp; delivery</button></nav>
      <button className={styles.list} onClick={()=>onNavigate('account')}>List on KHUB</button>
    </header>
    <main className={styles.main}>
      <div className={styles.eyebrow}>07 / COMMERCE / CHECKOUT</div>
      <h1>A few details. Then it’s yours.</h1>
      <p className={styles.subtitle}>Step 1 of 2 · Delivery details</p>
      <div className={styles.steps}><span className={styles.active}>1 Delivery</span><span>2 Payment</span><span>3 Confirmation</span></div>
      <div className={styles.layout}>
        <div className={styles.left}>
          <section className={styles.card}>
            <h2>Delivery address</h2>
            <span className={styles.pill}>◉ Home · Selected</span>
            <strong className={styles.addressName}>{recipient} · {phone}</strong>
            <p className={styles.addressLine}>{street}, {city}, Nigeria {postal}</p>
            <p className={styles.editLine}>Edit address · Use another saved address</p>
            <div className={styles.fields}>
              <label className={styles.field}>Recipient name<input value={recipient} onChange={e=>setRecipient(e.target.value)} required /></label>
              <label className={styles.field}>Phone<input value={phone} onChange={e=>setPhone(e.target.value)} required /></label>
              <label className={`${styles.field} ${styles.full}`}>Street address<input value={street} onChange={e=>setStreet(e.target.value)} required /></label>
              <label className={styles.field}>State / City<input value={city} onChange={e=>setCity(e.target.value)} required /></label>
              <label className={styles.field}>Postal code<input value={postal} onChange={e=>setPostal(e.target.value)} required /></label>
            </div>
            <label className={styles.checkbox}><input type="checkbox" checked={saveAddress} onChange={e=>setSaveAddress(e.target.checked)} /> Save this address for next time</label>
          </section>
          <section className={styles.card}>
            <h2>Delivery method</h2>
            <label className={styles.deliveryOption}><input type="radio" name="delivery" checked={delivery==='standard'} onChange={()=>setDelivery('standard')} /><span><strong>Standard delivery · ₦4,000</strong><small>2–4 business days · Both items in one order</small></span></label>
            <label className={styles.deliveryOption}><input type="radio" name="delivery" checked={delivery==='pickup'} onChange={()=>setDelivery('pickup')} /><span><strong>Pickup · ₦0</strong><small>Pickup locations differ by seller · Free</small></span></label>
            <label className={`${styles.field} ${styles.full}`}>Delivery instructions (optional)<textarea rows="2" value={instructions} onChange={e=>setInstructions(e.target.value)} /></label>
          </section>
          <section className={styles.card}>
            <h2>Items in this order</h2>
            <p>The Lekki lounge chair × 1 · ₦145,000<br/>Studio Nook · Forest green</p>
            <p>Wireless headphones × 1 · ₦58,000<br/>Sound House · Cream</p>
          </section>
          {error && <div className={styles.error} role="alert">{error}</div>}
        </div>
        <aside className={styles.right}><section className={styles.card}>
          <h2>Order summary</h2>
          <p>Subtotal (2 items) · {money(subtotal)}<br/>Lounge chair + wireless headphones</p>
          <p>Delivery fee · {money(fee)}<br/>{city.split('/').pop().trim()} • {delivery==='standard'?'standard delivery':'pickup'}</p>
          <hr/><h3>Total {money(total)}</h3>
          <small>No additional platform fee on this order. Prices include applicable taxes.</small>
          <button className={styles.primary} onClick={proceed}>Continue to payment <ChevronRight size={15}/></button>
          <small>Protected payment · Get help with a dispute</small>
        </section></aside>
      </div>
    </main>
    <footer className={styles.footer}><span>© KHUB · Privacy · Terms · Illustrative marketplace content</span><span>Trust &amp; safety　/　Contact support</span></footer>
  </div>;
}
