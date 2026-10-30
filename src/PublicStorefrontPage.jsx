import React, { useState } from 'react';
import { ArrowLeft, Check, Heart, MessageCircle, Flag, Star } from 'lucide-react';
import styles from './PublicStorefrontPage.module.css';
import studioImage from './assets/service.jpg';

export default function PublicStorefrontPage({ user = {}, onNavigate = () => {}, onBack = () => {} }) {
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const [notice, setNotice] = useState('');
  const isSeller = String(user.role || '').toLowerCase() === 'seller';
  const storeName = user.storeName || user.businessName || user.studioName || (isSeller ? 'Studio Nook' : 'Ada Studio');
  const owner = user.name || (isSeller ? 'Studio Nook team' : 'Ada Okafor');
  const title = isSeller ? 'Thoughtful finds for your everyday.' : 'Ada Studio';
  const intro = isSeller
    ? 'Considered home pieces and useful everyday finds from a local Nigerian business.'
    : 'Thoughtful identities for ambitious Nigerian businesses · Lagos / Remote';
  return <main className={styles.page}>
    <button className={styles.back} onClick={onBack}><ArrowLeft size={15}/> Back</button>
    <header className={styles.heading}><h1>{title}</h1><p>09 Personal hub / Public {isSeller ? 'seller storefront' : 'provider storefront'}</p><span>{intro}</span></header>
    <div className={styles.topGrid}>
      <div className={styles.mainColumn}>
        <div className={styles.heroImage}><img src={studioImage} alt={`${storeName} workspace`}/></div>
        <section className={styles.card + ' ' + styles.about}><h2>{isSeller ? 'Meet the business behind the finds' : 'Meet the person behind the work'}</h2><p className={styles.verified}><Check size={12}/> {owner} · Identity verified</p><p>{isSeller ? 'We curate useful, well-made pieces for homes and everyday life. Each listing includes clear details, local pricing and delivery information.' : 'I’m Ada, a brand designer with six years of experience. I work with independent businesses to create original identities, thoughtful packaging and launch-ready visual systems.'}</p><p>{isSeller ? 'Based in Lekki, Lagos · Local delivery available · Usually replies within 2 hours' : 'English / Igbo · Member since March 2022 · Usually replies within 2 hours'}</p><p className={styles.muted}>Verification confirms identity, not guaranteed service quality. All reviews and business data shown here are illustrative.</p></section>
      </div>
      <aside className={styles.sideColumn}>
        <section className={styles.card + ' ' + styles.workCard}><h2>Work with {isSeller ? storeName : 'Ada'}</h2><h3><Star size={16} fill="currentColor"/> 4.9 / 5</h3><p>28 client reviews · 52 completed projects · 98% completion</p><p><Check size={12}/> Available from 13 Oct</p><button className={styles.primary} onClick={() => onNavigate(isSeller ? 'shop' : 'provider-dashboard')}>{isSeller ? 'Explore products' : 'Explore service packages'}</button><button className={styles.link} onClick={() => onNavigate('messages')}><MessageCircle size={13}/> Message {isSeller ? 'seller' : 'Ada Studio'}</button><button className={styles.link} onClick={() => { setSaved(!saved); setNotice(!saved ? 'Provider saved to your list.' : 'Provider removed from your saved list.'); }}><Heart size={13} fill={saved ? 'currentColor' : 'none'}/> {saved ? 'Saved provider' : 'Save provider'}</button>{notice && <p className={styles.notice} role="status">{notice}</p>}</section>
        <section className={styles.card + ' ' + styles.credentials}><h2>{isSeller ? 'Store details' : 'Credentials'}</h2>{(isSeller ? ['Identity verified · KHUB seller', 'Based in Lekki, Lagos', 'Local delivery and collection options'] : ['Visual communication diploma · 2019', '6 years brand design experience', 'Portfolio and identity reviewed by KHUB']).map(x=><p key={x}>{x}</p>)}<button className={styles.link} onClick={() => { setReported(true); setNotice('Report started. Choose a reason in Support to continue.'); }}><Flag size={13}/> {reported ? 'Report started' : 'Report profile'}</button></section>
      </aside>
    </div>
    <section className={styles.card + ' ' + styles.portfolio}><h2>{isSeller ? 'Featured finds' : 'Portfolio / Selected work'}</h2><div className={styles.projects}>{(isSeller ? [{name:'NOOK',desc:'A place to belong',meta:'Home essentials · 2026',dark:true},{name:'Everyday',desc:'Useful by design',meta:'Homeware · 2026'},{name:'Local finds',desc:'Made for living',meta:'Curated collection · 2025'}] : [{name:'ÌRÈ',desc:'Everyday wellness',meta:'Brand identity · 2026'},{name:'NOOK',desc:'A place to belong',meta:'Packaging · 2026',dark:true},{name:'ÒRÍ',desc:'Ideas with direction',meta:'Visual system · 2025'}]).map(p=><article key={p.name}><div className={`${styles.projectTile} ${p.dark ? styles.darkTile : ''}`}><strong>{p.name}</strong><span>{p.desc}</span></div><p>{p.meta}</p></article>)}</div></section>
    <section className={styles.card + ' ' + styles.services}><h2>{isSeller ? 'Popular listings from ' + storeName : 'Services from Ada Studio'}</h2>{(isSeller ? [{name:'The Lekki lounge chair',scope:'Forest green · In stock',price:'₦145,000',action:'View item'},{name:'Walnut side table',scope:'Solid walnut · Low stock',price:'₦48,000',action:'View item'}] : [{name:'Brand identity',scope:'Essential / Standard / Launch',price:'₦45,000',action:'View packages'},{name:'Packaging design',scope:'Print-ready label / box assets',price:'₦60,000',action:'Request a brief'}]).map(item=><div className={styles.serviceRow} key={item.name}><p>{item.name}</p><p>Scope: {item.scope} <span>/</span> From: {item.price} <span>/</span> <button className={styles.inlineLink} onClick={() => onNavigate(isSeller ? 'shop' : 'provider-dashboard')}>{item.action}</button></p></div>)}</section>
    <section className={styles.card + ' ' + styles.reviews}><h2>Client words</h2><p>“Ada made our story visible. The handover was organised and the work felt truly ours.”</p><small>Funmi B. · ★★★★★ · Verified purchase · Standard · 02 Oct 2026</small><p>“Patient, clear and genuinely collaborative from discovery to final files.”</p><small>Emeka N. · ★★★★★ · Verified purchase · Launch · 24 Sep 2026</small></section>
  </main>;
}
