import React, { useState } from 'react';
import { CheckCircle2, Circle, Phone, MessageCircle, ShieldCheck, RefreshCw, Share2, LifeBuoy } from 'lucide-react';
import styles from './RideTrackingPage.module.css';

export default function RideTrackingPage({ user = {}, onBack = () => {}, onNavigate = () => {} }) {
  const [notice, setNotice] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [ended, setEnded] = useState(false);
  const riderName = user?.name || 'Tomi Adeyemi';
  const notify = (message) => setNotice(message);
  const refresh = () => { setRefreshing(true); setNotice('Tracking refreshed. The latest illustrative location is 11:38 WAT.'); window.setTimeout(() => setRefreshing(false), 700); };
  return <main className={styles.page}>
    <header className={styles.heading}>
      <h1>You’re on your way.</h1>
      <p>06 Rides and logistics / Active trip tracking</p>
      <p>Ride KH-RD-5520 · Economy · {ended ? 'Trip completed' : 'In progress'} · Updated 11 Oct 2026, 11:38 WAT</p>
    </header>
    <div className={styles.layout}>
      <div className={styles.leftColumn}>
        <section className={styles.mapCard} aria-label="Illustrative route map">
          <div className={styles.mapTop}><strong>Lekki · Admiralty Way</strong><span>8.2 km · 24 min</span></div>
          <svg className={styles.route} viewBox="0 0 700 330" preserveAspectRatio="none" role="img" aria-label="Route from Lekki to Victoria Island"><path d="M35 54 V116 H240 V174 H470 V228" fill="none" stroke="#123f32" strokeWidth="5" strokeLinejoin="miter"/><circle cx="35" cy="54" r="7" fill="#123f32" stroke="#fff" strokeWidth="3"/><circle cx="470" cy="228" r="7" fill="#123f32" stroke="#fff" strokeWidth="3"/><circle cx="240" cy="174" r="20" fill="#123f32"/><text x="240" y="178" fill="#fff" textAnchor="middle" fontSize="10">C O</text></svg>
          <strong className={styles.mapDestination}>Victoria Island · Ozumba</strong>
        </section>
        <p className={styles.caption}>Illustrative route, not a live map · Lagos</p>
        <section className={styles.card + ' ' + styles.arrival}>
          <h2>{ended ? 'Trip completed' : 'Arriving in about 12 minutes'}</h2>
          <p className={styles.status}><span className={styles.dot}/>{ended ? 'Completed · Final fare to be confirmed' : 'In progress · ETA 11:50 WAT'}</p>
          <h3>Victoria Island</h3><p>18 Ozumba Mbadiwe Avenue</p>
          <p className={styles.routeSummary}>Pickup: 12 Admiralty Way, Lekki Phase 1 · 8.2 km total route · Fare estimate ₦5,200</p>
        </section>
        <section className={styles.safety}><strong>Safety comes first</strong><p>Share your trip with someone you trust. For an immediate emergency, call Nigeria’s 112; KHUB support is not an emergency service.</p><button className={styles.link} onClick={() => notify('Trip details are ready to share: KH-RD-5520 · Lekki to Victoria Island · Driver Chinedu Okeke.')}>Share trip details</button></section>
      </div>
      <aside className={styles.rightColumn}>
        <section className={styles.card + ' ' + styles.driver}>
          <h2>Your driver</h2><div className={styles.driverRow}><div className={styles.avatar}>CO</div><div><h3>Chinedu Okeke</h3><p>★ 4.9 · 1,240 trips</p></div></div>
          <p>✓ Driver identity verified</p><p>Silver Toyota Corolla</p><h3>Plate · KJA 482 GT</h3>
          <div className={styles.actions}><button className={styles.primary} onClick={() => notify('Demo call action: Chinedu Okeke · +234 803 000 5520') }><Phone size={14}/> Call driver</button><button className={styles.link} onClick={() => onNavigate('messages')}><MessageCircle size={14}/> Message</button></div>
          <p className={styles.small}>Check driver and plate against this card. Do not board a different vehicle.</p>
        </section>
        <section className={styles.card + ' ' + styles.timeline}><h2>Trip timeline</h2>
          <div className={styles.event}><p>✓ Driver assigned · 11:26</p><span>Chinedu accepted your Economy request.</span></div>
          <div className={styles.event}><p>✓ Picked up · 11:30</p><span>Pickup confirmed at Admiralty Way.</span></div>
          <div className={styles.event}><p>{ended ? '✓ Trip completed' : '● On your way · 11:38'}</p><span>{ended ? 'Your trip has been marked complete.' : 'Crossing towards Victoria Island.'}</span></div>
          <div className={styles.event}><p>○ Arrival · About 11:50</p><span>Final fare confirmed after trip completion.</span></div>
        </section>
        <section className={styles.card + ' ' + styles.help}><h2>Need help now?</h2><button className={styles.primary + ' ' + styles.full} onClick={() => onNavigate('support')}><LifeBuoy size={14}/> Safety &amp; trip support</button><button className={styles.link} onClick={() => {setEnded(true);notify('Trip end request recorded in this demo. Final fare will be confirmed after completion.');}}>End trip / report a concern</button><p>Ending early updates the route and final fare. No cancellation fee added once the ride is underway.</p></section>
        <section className={styles.tip}><p>State example · Location delayed<br/>Last location update 2 minutes ago. Route and driver details stay visible. Refresh or call your driver; don’t assume the trip has stopped.</p><button className={styles.link} onClick={refresh}><RefreshCw size={13} className={refreshing ? styles.spin : ''}/> {refreshing ? 'Refreshing…' : 'Refresh tracking'}</button></section>
      </aside>
    </div>
    {notice && <div className={styles.notice} role="status"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
    <button className={styles.back} onClick={onBack}>← Back to orders &amp; bookings</button>
  </main>;
}
