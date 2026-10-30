import React, { useState } from 'react';
import { Heart, Check, ShieldCheck, ArrowLeft, Flag } from 'lucide-react';
import styles from './JobDetailPage.module.css';

export default function JobDetailPage({ job, onApply, onBack }) {
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const current = job || { title: 'Product designer', company: 'Cedar Digital', reference: 'KH-JB-3107', salary: '₦450,000–₦650,000 / month', location: 'Lagos', arrangement: 'Hybrid', type: 'Full-time', closes: '25 Oct 2026' };
  const productRole = current.title === 'Product designer';
  return <main className={styles.page}>
    <div className={styles.wrap}>
      <button className={styles.back} onClick={onBack}><ArrowLeft size={15}/> Back to jobs</button>
      <header className={styles.header}>
        <h1>{current.title}</h1>
        <p>05 Jobs / Job detail</p>
        <p>{current.company} · {current.location || 'Lagos'}, Nigeria · Job {current.reference}</p>
      </header>
      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <section className={styles.card}>
            <h2>{productRole ? 'Design everyday progress' : 'Make a meaningful difference'}</h2>
            <p className={styles.verified}><Check size={14}/> Employer verified</p>
            <h3 className={styles.salary}>{current.salary}</h3>
            <p>{current.type || 'Full-time'} · {current.arrangement || 'Hybrid'}{productRole ? ' (3 days in office) · Mid-level · 3+ years' : ' · Experienced role'}</p>
            <p>Posted 10 Oct 2026 · Applications close {current.closes || '25 Oct 2026'}</p>
            <p>{productRole ? 'We build digital tools for Nigerian small businesses. Join a multidisciplinary team making payments, inventory and customer experiences simpler for local merchants.' : `Join ${current.company} and help the team deliver thoughtful, reliable work. Bring your experience, collaborate across teams and make a measurable impact.`}</p>
          </section>
          <section className={styles.card}>
            <h2>What you’ll work on</h2>
            {productRole ? <>
              <p><strong>Own product discovery</strong><br/>Turn research with merchants into clear user journeys and testable prototypes.</p>
              <p><strong>Craft accessible interfaces</strong><br/>Partner with engineers to ship responsive, accessible flows and a consistent design system.</p>
              <p><strong>Measure and improve</strong><br/>Use usability testing and product data to iterate beyond the first release.</p>
            </> : <>
              <p><strong>Deliver excellent work</strong><br/>Own priorities, communicate progress and deliver quality outcomes on schedule.</p>
              <p><strong>Work collaboratively</strong><br/>Partner with colleagues and stakeholders to solve practical customer problems.</p>
              <p><strong>Keep improving</strong><br/>Use feedback and evidence to improve processes and results.</p>
            </>}
          </section>
          <section className={styles.card}>
            <h2>What you’ll bring</h2>
            { (productRole ? ['3+ years designing shipped web or mobile products.', 'A portfolio showing your process, trade-offs and outcomes.', 'Strong Figma skills, responsive layout and accessibility knowledge.', 'Clear collaboration and communication; fintech experience is a plus.'] : ['Relevant experience and a record of delivering good work.', 'Clear communication, organisation and problem-solving skills.', 'Ability to collaborate and manage priorities independently.', 'A thoughtful, reliable approach to learning and improvement.']).map(item => <p className={styles.bullet} key={item}>• {item}</p>)}
            <p>Equivalent practical experience is welcome. You do not need to meet every nice-to-have.</p>
          </section>
        </div>
        <aside className={styles.sideCol}>
          <section className={`${styles.card} ${styles.applyCard}`}>
            <h2>Ready for your next chapter?</h2>
            <button className={styles.primary} onClick={onApply}>Apply for this job</button>
            <button className={styles.textButton} onClick={() => setSaved(v => !v)}><Heart size={14} fill={saved ? 'currentColor' : 'none'}/> {saved ? 'Saved job' : 'Save job'}</button>
            {saved && <p className={styles.feedback}>This job is saved in this session.</p>}
            <p>CV (PDF / DOCX up to 5 MB) and portfolio link required. No application fee.</p>
          </section>
          <section className={styles.card}>
            <h2>About {current.company}</h2>
            <h3>{current.company === 'Cedar Digital' ? 'CD / Cedar Digital' : current.company}</h3>
            <p>{current.company === 'Cedar Digital' ? 'Lagos-based product company · 45–60 people · Established 2018' : 'A Nigerian employer committed to clear role expectations and a respectful recruitment process.'}</p>
            <p>18 Ozumba Mbadiwe Avenue, Victoria Island, Lagos</p>
            <p>Health cover, paid leave, learning budget and equipment support. Salary offer depends on experience within the advertised range.</p>
          </section>
          <section className={styles.card}>
            <h2>Hiring process</h2>
            <p>1 · Application review<br/>CV and portfolio reviewed within 7 business days.</p>
            <p>2 · Portfolio conversation<br/>60-minute remote interview; discuss work you already created.</p>
            <p>3 · Team conversation / offer<br/>No unpaid production assignment. Terms supplied in writing.</p>
          </section>
          <section className={styles.safetyCard}>
            <h3>Stay safe</h3>
            <p>Verified employer identity is not a guarantee of a job offer. Report requests for payment, OTPs or sensitive bank information.</p>
            <button className={styles.textButton} onClick={() => setReported(true)}><Flag size={14}/> {reported ? 'Job report noted' : 'Report this job'}</button>
            {reported && <p className={styles.feedback}>Thanks. This demo has noted your report locally.</p>}
          </section>
        </aside>
      </div>
    </div>
  </main>;
}
