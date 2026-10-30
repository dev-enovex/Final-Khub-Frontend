import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';

const sections = ['Operations', 'Moderation', 'Identity verification', 'Disputes', 'Flagged activity', 'Payout approvals', 'Users & roles', 'Policy library', 'Audit log', 'Reports', 'Settings'];
const queues = {
  Moderation: [
    ['MOD-882 · Rental deposit ad', 'Signal: Off-platform payment request', 'High · 42 min', 'Review evidence'],
    ['MOD-879 · Tech listing', 'Signal: Duplicate inventory photos', 'Medium · 1h 10m', 'Compare listings'],
    ['MOD-875 · Home repair profile', 'Signal: Credential mismatch', 'High · 1h 35m', 'Check credentials'],
  ],
  'Identity verification': [
    ['VER-104 · Chidi Technical', 'Subject: Identity / trade documents', 'Pending · 1 day', 'Request clarification'],
    ['VER-101 · Delta Connect', 'Subject: Business registration', 'Pending · 18h', 'Review documents'],
    ['VER-099 · O. James', 'Subject: Identity documents', 'In review · 4h', 'Open verification'],
  ],
  Disputes: [
    ['DSP-407 · ₦48,000', 'Item not as described · Buyer and seller evidence received', 'Escalated', 'Review dispute'],
    ['DSP-404 · ₦120,000', 'Service scope disagreement · Mediation due today', 'Escalated', 'Open mediation'],
  ],
  Payouts: [
    ['PAY-228 · ₦420,000', 'Studio Home · Bank name mismatch · Funds held pending evidence', 'Approval pending', 'Review payout evidence'],
    ['PAY-226 · ₦180,000', 'Risk rule triggered · Additional review required', 'Held', 'Open risk review'],
  ],
};

export default function AdminDashboard({ onNavigate }) {
  const [active, setActive] = useState('Operations');
  const [selectedTab, setSelectedTab] = useState('Moderation (24)');
  const [notice, setNotice] = useState('');
  const action = (label) => setNotice(`${label} selected. Review actions are recorded in this demo workspace.`);
  const queue = active === 'Identity verification' ? queues['Identity verification'] : active === 'Disputes' ? queues.Disputes : active === 'Payout approvals' ? queues.Payouts : queues.Moderation;
  return <div className={styles.shell}>
    <aside className={styles.sidebar} aria-label="Admin navigation">
      {sections.map((section) => <button key={section} className={active === section ? styles.activeSide : ''} onClick={() => { setActive(section); setNotice(''); }}><span>{active === section ? '◉' : ''}</span>{section}</button>)}
    </aside>
    <main className={styles.main}>
      <h1>Trust is a daily practice.</h1>
      <p className={styles.kicker}>08 Role workspaces / Admin dashboard</p>
      <p className={styles.subhead}>Trust &amp; safety operations · Amina Yusuf · Restricted admin workspace · Audit logging on</p>
      <div className={styles.metrics}>
        <article><strong>24</strong><span>Moderation</span><small>8 due within 2 hours</small></article>
        <article><strong>16</strong><span>Verification</span><small>Documents under review</small></article>
        <article><strong>7</strong><span>Open disputes</span><small>2 escalated</small></article>
        <article><strong>₦1.26m</strong><span>Held payouts</span><small>9 risk reviews</small></article>
      </div>
      <nav className={styles.tabs} aria-label="Admin queues">{['Moderation (24)', 'Verification (16)', 'Disputes (7)', 'Payouts (9)'].map(tab => <button key={tab} className={selectedTab === tab ? styles.selectedTab : ''} onClick={() => { setSelectedTab(tab); setActive(tab.startsWith('Verification') ? 'Identity verification' : tab.startsWith('Disputes') ? 'Disputes' : tab.startsWith('Payouts') ? 'Payout approvals' : 'Moderation'); }}>{tab}</button>)}</nav>
      {notice && <div className={styles.notice} role="status">{notice}</div>}
      <section className={styles.panel}>
        <h2>{active === 'Identity verification' ? 'Verification priority queue' : active === 'Disputes' ? 'Disputes needing a decision' : active === 'Payout approvals' ? 'Payout review' : active === 'Operations' || active === 'Moderation' || active === 'Flagged activity' ? 'Moderation priority queue' : `${active} workspace`}</h2>
        {queue.map(([title, signal, priority, next]) => <div className={styles.queueItem} key={title}><p>{title}</p><div>{signal} <span>/</span> Priority / age: ! {priority} <span>/</span> Next action: {next}</div><button onClick={() => action(next)}>{next}</button></div>)}
      </section>
      <div className={styles.columns}>
        <div className={styles.leftStack}>
          <section className={styles.panel}>
            <h2>Verification and flagged activity</h2>
            <div className={styles.compactItem}><p>VER-104 · Chidi Technical</p><div>Subject: Identity / trade documents <span>/</span> Status: ◷ Pending · 1 day <span>/</span> Action: Request clarification</div><button onClick={() => action('Request clarification')}>Request clarification</button></div>
            <div className={styles.compactItem}><p>RSK-228 · Seller account</p><div>Subject: Unusual payout velocity <span>/</span> Status: ! Flagged · Held <span>/</span> Action: Open risk review</div><button onClick={() => action('Open risk review')}>Open risk review</button></div>
            <div className={styles.compactItem}><p>VER-101 · Delta Connect</p><div>Subject: Business registration <span>/</span> Status: ◷ Pending · 18h <span>/</span> Action: Review documents</div><button onClick={() => action('Review documents')}>Review documents</button></div>
            <p className={styles.note}>Advertised placement is paid visibility, not verification. Never award verified status without completed checks.</p>
          </section>
          <section className={styles.panel}>
            <h2>Payout review</h2><p>PAY-228 · ₦420,000</p><p>Studio Home · Bank name mismatch · Funds held pending evidence</p><p>◷ Approval pending</p><div className={styles.actions}><button className={styles.primary} onClick={() => action('Review payout evidence')}>Review payout evidence</button><button className={styles.link} onClick={() => action('Request second approval')}>Request second approval</button></div>
          </section>
        </div>
        <aside className={styles.rightStack}>
          <section className={styles.panel}><h2>Disputes needing a decision</h2><p>! 2 escalated</p><p>DSP-407 · ₦48,000<br/>Item not as described · Buyer and seller evidence received</p><p>DSP-404 · ₦120,000<br/>Service scope disagreement · Mediation due today</p><button className={styles.primary} onClick={() => { setActive('Disputes'); setSelectedTab('Disputes (7)'); }}>Open dispute queue</button></section>
          <section className={styles.tip}><p>Evidence before action</p><p>Use least-privilege access. Record policy, evidence and reason; sensitive identity documents are masked until explicitly authorised.</p></section>
          <section className={styles.panel}><h2>Latest audit events</h2><p>11:32 · Listing removed · MOD-871 · A. Yusuf</p><p>11:18 · Identity verified · VER-099 · O. James</p><p>10:56 · Payout held · PAY-226 · Risk rule</p><button className={styles.link} onClick={() => setActive('Audit log')}>View audit log</button></section>
        </aside>
      </div>
      <footer className={styles.footer}><button onClick={() => onNavigate?.('home')}>Return to KHUB</button></footer>
    </main>
  </div>;
}
