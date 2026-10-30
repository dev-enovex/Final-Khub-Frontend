import React, { useRef, useState } from 'react';
import { CheckCircle2, Upload, X, Image as ImageIcon } from 'lucide-react';
import styles from './SellerListingForm.module.css';

const initialPhotos = [];
export default function SellerListingForm({ onNavigate, onSaved }) {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState(initialPhotos);
  const [form, setForm] = useState({ type: 'Product for sale', title: 'The Lekki lounge chair', category: 'Furniture & home / Chairs', description: 'Forest green lounge chair with solid walnut legs. Designed and upholstered in Lagos. New, ready for delivery.', condition: 'New', price: '145000', stock: '4', city: 'Lagos / Lekki Phase 1', fulfilment: 'Delivery and pickup', approximate: true, accepted: true });
  const fileRef = useRef(null);
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const uploadFiles = files => {
    const next = Array.from(files || []).filter(file => file.type.startsWith('image/')).map(file => ({ id: `${file.name}-${file.lastModified}-${Math.random()}`, name: file.name, url: URL.createObjectURL(file) }));
    setPhotos(current => [...current, ...next].slice(0, 8));
    setSaved(false);
  };
  const saveDraft = () => { setSaved(true); setSubmitted(false); onSaved?.(form); };
  const submit = event => { event.preventDefault(); setSubmitted(true); setSaved(false); };
  const Field = ({ label, value, onChange, children, full = false, ...props }) => <label className={`${styles.field} ${full ? styles.full : ''}`}><span>{label}</span>{children || <input value={value} onChange={onChange} {...props} />}</label>;
  return <div className={styles.page}>
    <main className={styles.main}>
      <div className={styles.eyebrow}>03 / SELLER / PUBLISH &amp; EDIT LISTING</div>
      <div className={styles.titleRow}><div><h1>Make your listing stand out</h1><p>{submitted ? 'Submitted for review · The listing is not yet visible to buyers.' : saved ? 'Draft saved · The Lekki lounge chair · Just now' : 'Editing draft · The Lekki lounge chair · Saved at 10:42 AM'}</p></div><button className={styles.primary} onClick={saveDraft}>{saved ? 'Draft saved' : 'Save draft'}</button></div>
      <div className={styles.steps} aria-label="Listing steps">{['Details','Media','Price & location','Review'].map((name, i) => <button key={name} className={step === i + 1 ? styles.activeStep : ''} onClick={() => setStep(i + 1)}>{i + 1} {name}</button>)}</div>
      {submitted && <div className={styles.success}><CheckCircle2 size={19}/><div><strong>Listing submitted for review</strong><p>Your listing reference is KH-LS-10482. New listings may enter moderation before buyers can see them.</p><button onClick={() => onNavigate?.('seller-dashboard')}>Go to seller dashboard</button></div></div>}
      <form onSubmit={submit}>
        <div className={styles.layout}>
          <div className={styles.leftCol}>
            {(step === 1 || step === 4) && <section className={styles.card}><h2>Listing details</h2><div className={styles.fields}>
              <Field label="Listing type" full><select value={form.type} onChange={e => update('type', e.target.value)}><option>Product for sale</option><option>Property for rent</option><option>Equipment for rent</option><option>Service</option></select></Field>
              <Field label="Title" value={form.title} onChange={e => update('title', e.target.value)} full required />
              <Field label="Category" full><select value={form.category} onChange={e => update('category', e.target.value)}><option>Furniture & home / Chairs</option><option>Electronics / Audio</option><option>Fashion / Clothing</option><option>Home & living</option><option>Sports & outdoors</option><option>Other</option></select></Field>
              <Field label="Description" full><textarea rows="2" value={form.description} onChange={e => update('description', e.target.value)} required /></Field>
              <Field label="Condition" full><select value={form.condition} onChange={e => update('condition', e.target.value)}><option>New</option><option>Like new</option><option>Good</option><option>Fair</option></select></Field>
            </div></section>}
            {(step === 2 || step === 4) && <section className={styles.card}><h2>Photos &amp; media</h2><div className={styles.photoGrid}>
              {photos.map(photo => <div className={styles.photo} key={photo.id}><img src={photo.url} alt={photo.name}/><button type="button" aria-label={`Remove ${photo.name}`} onClick={() => setPhotos(current => current.filter(item => item.id !== photo.id))}><X size={15}/></button></div>)}
              {[0, 1].slice(0, Math.max(0, 2 - photos.length)).map(n => <button type="button" className={styles.photoPlaceholder} key={n} onClick={() => fileRef.current?.click()}><ImageIcon size={24}/><span>{n === 0 ? 'Add cover photo' : 'Add another photo'}</span></button>)}
            </div><input ref={fileRef} className={styles.fileInput} type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={e => uploadFiles(e.target.files)} /><button type="button" className={styles.secondary} onClick={() => fileRef.current?.click()}><Upload size={15}/> Upload photos</button><p className={styles.hint}>JPG or PNG · Up to 10 MB each · 3–8 photos recommended. Drag to reorder; first image is the cover.</p>{photos.length > 0 && <p className={styles.hint}>{photos.length} photo{photos.length === 1 ? '' : 's'} selected</p>}</section>}
            {step === 3 && <section className={styles.card}><h2>Price &amp; location</h2><div className={styles.fields}><Field label="Price (₦)" value={form.price} onChange={e => update('price', e.target.value)} type="number" min="0" required/><Field label="Stock quantity" value={form.stock} onChange={e => update('stock', e.target.value)} type="number" min="1" required/><Field label="City / Area" value={form.city} onChange={e => update('city', e.target.value)} full required/><Field label="Fulfilment" full><select value={form.fulfilment} onChange={e => update('fulfilment', e.target.value)}><option>Delivery and pickup</option><option>Delivery only</option><option>Pickup only</option></select></Field></div><label className={styles.check}><input type="checkbox" checked={form.approximate} onChange={e => update('approximate', e.target.checked)}/> Show approximate location only</label></section>}
            <div className={styles.formActions}><button type="button" className={styles.secondary} onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>Previous</button><button type="button" className={styles.primary} onClick={() => setStep(s => Math.min(4, s + 1))}>{step === 4 ? 'Review complete' : 'Continue'}</button></div>
          </div>
          <aside className={styles.rightCol}>
            {(step === 1 || step === 2 || step === 3) && <section className={styles.card}><h2>Pricing &amp; location</h2><div className={styles.fieldsOne}><Field label="Price (₦)" value={form.price} onChange={e => update('price', e.target.value)} type="number" min="0" required/><Field label="Stock quantity" value={form.stock} onChange={e => update('stock', e.target.value)} type="number" min="1" required/><Field label="City / Area" value={form.city} onChange={e => update('city', e.target.value)} required/><Field label="Fulfilment"><select value={form.fulfilment} onChange={e => update('fulfilment', e.target.value)}><option>Delivery and pickup</option><option>Delivery only</option><option>Pickup only</option></select></Field></div><label className={styles.check}><input type="checkbox" checked={form.approximate} onChange={e => update('approximate', e.target.checked)}/> Show approximate location only</label></section>}
            <section className={styles.card}><h2>Review before publishing</h2><span className={styles.pill}>{submitted ? 'Submitted · In review' : 'Draft · Not visible to buyers'}</span><ul className={styles.reviewList}><li>✓ Category and price added</li><li>{photos.length >= 3 ? '✓' : '✓'} {photos.length || 2} photos {photos.length >= 3 ? 'uploaded' : 'uploaded or shown in preview'}</li><li>○ Add 1 more photo for a stronger listing</li></ul><label className={styles.check}><input type="checkbox" checked={form.accepted} onChange={e => update('accepted', e.target.checked)}/> This item is accurately described and allowed on KHUB.</label><button className={styles.primaryWide} type="submit" disabled={!form.accepted || !form.title.trim() || !form.price || Number(form.price) < 0}>{submitted ? 'Submitted for review' : 'Submit for review'}</button>{saved && <p className={styles.inlineSuccess}>Draft saved locally.</p>}</section>
            <section className={styles.note}><strong>What happens next</strong><p>New listings may enter moderation. Paid promotion is separate and always labelled Advertised.</p></section>
          </aside>
        </div>
      </form>
    </main>
    <footer className={styles.footer}><span>© KHUB · Privacy · Terms · Illustrative marketplace content</span><span>Trust &amp; safety　 /　 Contact support</span></footer>
  </div>;
}
