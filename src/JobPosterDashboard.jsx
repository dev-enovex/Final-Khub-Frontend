import React, { useState } from 'react';
import styles from './JobPosterDashboard.module.css';

const navItems = ['Overview', 'Jobs', 'Applicants', 'Interviews', 'Talent shortlist', 'Company profile', 'Team access', 'Billing', 'Messages', 'Support', 'Settings'];
const applicants = {
  'New (6)': [
    ['Tomi Adeyemi', 'Experience: 4 years · Lagos', 'Application: KH-AP-9012 · New', 'Review CV / portfolio'],
    ['Zainab Musa', 'Experience: 5 years · Abuja', 'Application: KH-AP-8998 · New', 'Review application'],
    ['Emeka Nwosu', 'Experience: 3 years · Lagos', 'Application: KH-AP-8991 · New', 'Review application'],
  ],
  'Review (18)': [
    ['Chika Okafor', 'Experience: 6 years · Lagos', 'Application: KH-AP-8972 · In review', 'Continue review'],
    ['Segun Bello', 'Experience: 4 years · Abuja', 'Application: KH-AP-8960 · In review', 'Review portfolio'],
  ],
  'Shortlist (8)': [
    ['Nneka Obi', 'Experience: 5 years · Lagos', 'Application: KH-AP-8914 · Shortlisted', 'View candidate'],
    ['Tunde James', 'Experience: 7 years · Remote', 'Application: KH-AP-8902 · Shortlisted', 'View candidate'],
  ],
  'Interview (4)': [
    ['Nneka Obi', 'Product designer · Mon 12 Oct, 10:00 WAT', 'Interview scheduled', 'Open interview'],
    ['Segun Bello', 'Frontend engineer · Tue 13 Oct, 14:30 WAT', 'Interview scheduled', 'Open interview'],
  ],
  'Offer (2)': [['Amina Yusuf', 'Product designer · Lagos', 'Offer sent · Awaiting response', 'View offer']],
};

export default function JobPosterDashboard({ user, onNavigate = () => {} }) {
  const [active, setActive] = useState('Overview');
  const [tab, setTab] = useState('New (6)');
  const [notice, setNotice] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([
    { title: 'Product designer', id: 'KH-JB-3107', applicants: '38 · 6 new', closing: '25 Oct', count: '2 design / 1 engineering' },
    { title: 'Frontend engineer', id: 'KH-JB-3112', applicants: '31 · 4 new', closing: '28 Oct' },
    { title: 'Product researcher', id: 'KH-JB-3102', applicants: '15 · 2 new', closing: '20 Oct' },
  ]);
  const action = (label) => setNotice(`${label} selected. Your changes are shown in this demo workspace.`);
  const createJob = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get('title') || '').trim();
    if (!title) return;
    setJobs((prev) => [{ title, id: `KH-JB-${3120 + prev.length}`, applicants: '0 · 0 new', closing: String(data.get('closing') || '30 Oct') }, ...prev]);
    setShowJobForm(false);
    setActive('Jobs');
    setNotice(`“${title}” has been added to your live opportunities in this demo.`);
    e.currentTarget.reset();
  };
  const selectNav = (item) => {
    setActive(item); setNotice('');
    if (item === 'Messages') onNavigate('messages');
    if (item === 'Support') onNavigate('support');
    if (item === 'Settings') onNavigate('settings');
  };
  return <div className={styles.shell}>
    <aside className={styles.sidebar} aria-label="Job poster navigation">
      {navItems.map((item) => <button key={item} className={active === item ? styles.activeNav : styles.navItem} onClick={() => selectNav(item)}><span>{active === item ? '◉' : ''}</span>{item}</button>)}
    </aside>
    <main className={styles.main}>
      <header className={styles.heading}>
        <h1>{active === 'Overview' ? 'Find the people who move you forward.' : active}</h1>
        <p>08 Role workspaces / Job-poster dashboard<br />{user?.company || 'Cedar Digital'} · Employer verified · Recruitment workspace</p>
      </header>
      <section className={styles.stats} aria-label="Recruitment summary">
        <article className={styles.stat}><strong>{jobs.length}</strong><span>Open roles</span><small>{jobs.length > 0 ? '2 design / 1 engineering' : 'No open roles yet'}</small></article>
        <article className={styles.stat}><strong>84</strong><span>Applicants</span><small>12 new this week</small></article>
        <article className={styles.stat}><strong>18</strong><span>Shortlisted</span><small>Across open roles</small></article>
        <article className={styles.stat}><strong>21%</strong><span>Interview rate</span><small>18 of 84 applicants</small></article>
      </section>

      {active === 'Company profile' ? <section className={styles.card}><h2>Employer profile</h2><h3>{user?.company || 'Cedar Digital'}</h3><p>✓ Business identity verified · Team: 3 hiring members · No applicant fees</p><button className={styles.primary} onClick={() => action('Edit company profile')}>Edit company profile</button><button className={styles.inlineLink} onClick={() => action('Preview public company profile')}>Preview company profile</button></section>
      : active === 'Team access' || active === 'Billing' ? <section className={styles.card}><h2>{active}</h2><p>{active === 'Team access' ? 'Manage authorised hiring team members and their access to candidate information.' : 'Manage your recruitment plan and billing details.'}</p><button className={styles.primary} onClick={() => action(active === 'Team access' ? 'Invite team member' : 'Manage billing')}>{active === 'Team access' ? 'Invite team member' : 'Manage billing'}</button></section>
      : active === 'Interviews' ? <section className={styles.card}><h2>Interview schedule</h2><p>Mon 12 Oct · 10:00 WAT<br />Portfolio conversation · Nneka Obi · Product designer</p><p>Tue 13 Oct · 14:30 WAT<br />Engineering interview · Segun Bello</p><button className={styles.inlineLink} onClick={() => action('Schedule interview')}>Schedule interview</button></section>
      : active === 'Talent shortlist' ? <section className={styles.card}><h2>Talent shortlist</h2>{applicants['Shortlist (8)'].map((a) => <div className={styles.person} key={a[0]}><strong>{a[0]}</strong><p>{a[1]}　/　{a[2]}</p><button className={styles.inlineLink} onClick={() => action(a[3])}>{a[3]}</button></div>)}</section>
      : <>
        <section className={styles.columns}>
          <div className={styles.left}>
            <section className={styles.card}>
              <h2>Your live opportunities</h2>
              {jobs.slice(0, 3).map((job) => <div className={styles.job} key={job.id}><p>{job.title} · {job.id}</p><p>Applicants: {job.applicants}　/　Closing / status: {job.closing} · ✓ Live　/　Manage: <button className={styles.inlineLink} onClick={() => action(`Manage ${job.title}`)}>Edit / pause</button></p></div>)}
              <button className={styles.primary} onClick={() => { setShowJobForm((v) => !v); setNotice(''); }}>{showJobForm ? 'Cancel new job' : 'Post a new job'}</button>
              {showJobForm && <form className={styles.jobForm} onSubmit={createJob}><label>Job title<input name="title" required placeholder="e.g. UX researcher" /></label><label>Closing date<input name="closing" placeholder="30 Oct" /></label><button className={styles.primary} type="submit">Publish job</button></form>}
            </section>
            <section className={styles.card}>
              <h2>{active === 'Applicants' ? 'Applicant pipeline' : 'Product designer · Applicant pipeline'}</h2>
              <div className={styles.tabs}>{Object.keys(applicants).map((name) => <button key={name} className={tab === name ? styles.activeTab : styles.tab} onClick={() => { setTab(name); setActive('Applicants'); }}>{name}</button>)}</div>
              {applicants[tab].map((a) => <div className={styles.person} key={a[0]}><strong>{a[0]}</strong><p>{a[1]}　/　{a[2]}　/　Action: <button className={styles.inlineLink} onClick={() => action(a[3])}>{a[3]}</button></p></div>)}
              <p className={styles.note}>CVs are private to authorised hiring team members. Do not export or reuse applicant data beyond the consented role.</p>
            </section>
          </div>
          <aside className={styles.right}>
            <section className={styles.card}><h2>Interview schedule</h2><p>Mon 12 Oct · 10:00 WAT<br />Portfolio conversation · Nneka Obi · Product designer</p><p>Tue 13 Oct · 14:30 WAT<br />Engineering interview · Segun Bello</p><button className={styles.inlineLink} onClick={() => { setActive('Interviews'); setNotice(''); }}>Schedule interview</button></section>
            <section className={styles.card}><h2>Hiring health</h2><p>! 6 applications await review</p><p>Oldest unread application: 2 days. Your stated review window is 7 business days.</p><button className={styles.primary} onClick={() => { setActive('Applicants'); setTab('New (6)'); }}>Review new applicants</button></section>
            <section className={styles.card}><h2>Employer profile</h2><h3>{user?.company || 'Cedar Digital'}</h3><p>✓ Business identity verified · Team: 3 hiring members · No applicant fees</p><button className={styles.inlineLink} onClick={() => setActive('Team access')}>Manage team permissions</button></section>
          </aside>
        </section>
      </>}
      {notice && <div className={styles.notice} role="status">{notice} <button className={styles.inlineLink} onClick={() => setNotice('')}>Dismiss</button></div>}
    </main>
  </div>;
}
