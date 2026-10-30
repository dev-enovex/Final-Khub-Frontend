import React, { useMemo, useState } from 'react';
import styles from './ServicesPage.module.css';
import serviceImage from './assets/service.jpg';

const providers = [
  {
    id: 1,
    title: 'Brand identity by Ada Studio',
    category: 'Design',
    provider: 'Ada Okafor',
    location: 'Lagos / Remote',
    rating: '4.9',
    reviews: 28,
    price: 45000,
    verified: true,
    image: serviceImage,
    description: 'Brand identity, logos and launch-ready visual assets.',
  },
  {
    id: 2,
    title: 'Launch-ready website',
    category: 'Technology',
    provider: 'Tunde Webworks',
    location: 'Abuja / Remote',
    rating: '4.8',
    reviews: 41,
    price: 120000,
    verified: true,
    advertised: true,
    visualTitle: 'WEB / BUILD',
    visualText: 'Your next chapter, online.',
    description: 'Responsive websites and online stores for growing businesses.',
  },
  {
    id: 3,
    title: 'Product photography',
    category: 'Photography',
    provider: 'Frame House',
    location: 'Lekki, Lagos',
    rating: '4.7',
    reviews: 19,
    price: 35000,
    verified: true,
    visualTitle: 'FRAME / SHOOT',
    visualText: 'The details, beautifully seen.',
    description: 'Product shoots, portraits and commercial photography.',
  },
  {
    id: 4,
    title: 'Home electrical repair',
    category: 'Home & repairs',
    provider: 'Chidi Technical',
    location: 'Port Harcourt',
    rating: '4.8',
    reviews: 62,
    price: 15000,
    verified: false,
    visualTitle: 'HOME / REPAIR',
    visualText: 'Skilled hands. A safer home.',
    description: 'Electrical checks, installations and household repairs.',
  },
];

const categories = ['All services', 'Design', 'Technology', 'Home & repairs', 'Photography'];
const money = (amount) => `₦${amount.toLocaleString('en-NG')}`;

export default function ServicesPage({ onHome, onNavigate }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All services');
  const [location, setLocation] = useState('All cities');
  const [budget, setBudget] = useState('₦15,000 – ₦150,000');
  const [available, setAvailable] = useState(true);
  const [highRated, setHighRated] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState('Remote & on-site');
  const [applied, setApplied] = useState({
    location: 'All cities',
    budget: '₦15,000 – ₦150,000',
    available: true,
    highRated: true,
    verifiedOnly: false,
    deliveryMode: 'Remote & on-site',
  });

  const visibleProviders = useMemo(() => providers.filter((provider) => {
    const matchesSearch = `${provider.title} ${provider.category} ${provider.provider} ${provider.description}`
      .toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All services' || provider.category === activeCategory;
    const matchesLocation = applied.location === 'All cities'
      || provider.location.toLowerCase().includes(applied.location.toLowerCase());
    const matchesBudget = provider.price >= 15000 && provider.price <= 150000;
    const matchesRating = !applied.highRated || Number(provider.rating) >= 4;
    const matchesVerified = !applied.verifiedOnly || provider.verified;
    return matchesSearch && matchesCategory && matchesLocation && matchesBudget && matchesRating && matchesVerified;
  }), [search, activeCategory, applied]);

  const clearFilters = () => {
    setLocation('All cities');
    setBudget('₦15,000 – ₦150,000');
    setAvailable(false);
    setHighRated(false);
    setVerifiedOnly(false);
    setDeliveryMode('Remote & on-site');
    setApplied({ location: 'All cities', budget: '₦15,000 – ₦150,000', available: false, highRated: false, verifiedOnly: false, deliveryMode: 'Remote & on-site' });
  };

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <h1>Good people. Great work.</h1>
        <p className={styles.breadcrumb}>04 Services / Services search</p>
        <p className={styles.subtitle}>Find skilled local providers with clear packages and real project context.</p>
        <label className={styles.searchBox}>
          <span>Search services</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Brand design, websites, home repairs..." />
        </label>
      </section>

      <nav className={styles.tabs} aria-label="Service categories">
        {categories.map((category) => (
          <button key={category} className={activeCategory === category ? styles.activeTab : ''} onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </nav>

      <div className={styles.content}>
        <aside className={styles.filters}>
          <h2>Refine your results</h2>
          <label className={styles.selectField}>Location
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option>All cities</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option>
            </select>
          </label>
          <label className={styles.selectField}>Budget range
            <select value={budget} onChange={(event) => setBudget(event.target.value)}>
              <option>₦15,000 – ₦150,000</option><option>₦15,000 – ₦50,000</option><option>₦50,000 – ₦150,000</option>
            </select>
          </label>
          <label className={styles.checkbox}><input type="checkbox" checked={available} onChange={(event) => setAvailable(event.target.checked)} /> Available this week</label>
          <label className={styles.checkbox}><input type="checkbox" checked={highRated} onChange={(event) => setHighRated(event.target.checked)} /> Rated 4 stars & above</label>
          <label className={styles.checkbox}><input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} /> Identity verified only</label>
          <label className={styles.selectField}>Delivery mode
            <select value={deliveryMode} onChange={(event) => setDeliveryMode(event.target.value)}>
              <option>Remote & on-site</option><option>Remote</option><option>On-site</option>
            </select>
          </label>
          <button className={styles.applyButton} onClick={() => setApplied({ location, budget, available, highRated, verifiedOnly, deliveryMode })}>Apply filters</button>
          <button className={styles.clearButton} onClick={clearFilters}>Clear filters</button>
        </aside>

        <section className={styles.results}>
          <div className={styles.resultsTop}>
            <p>Showing {visibleProviders.length} curated providers · Illustrative results</p>
            <label>Sort: <select aria-label="Sort providers" defaultValue="Recommended"><option>Recommended</option><option>Highest rated</option><option>Price: low to high</option></select></label>
          </div>
          <div className={styles.providerGrid}>
            {visibleProviders.map((provider) => (
              <article className={styles.card} key={provider.id}>
                {provider.image ? (
                  <img className={styles.providerImage} src={provider.image} alt="Creative service provider working at a computer" />
                ) : (
                  <div className={styles.visual}>
                    <strong>{provider.visualTitle}</strong><span>{provider.visualText}</span>
                  </div>
                )}
                <div className={styles.cardBody}>
                  <p className={provider.verified ? styles.verified : styles.pending}>{provider.advertised ? 'Advertised · ' : ''}{provider.verified ? '✓ Identity verified' : '◷ Verification pending'}</p>
                  <h2>{provider.title}</h2>
                  <p className={styles.providerMeta}>{provider.provider} · {provider.location}</p>
                  <p className={styles.rating}>★ {provider.rating} · {provider.reviews} reviews</p>
                  <p className={styles.price}>From {money(provider.price)}</p>
                  <button className={styles.viewLink} onClick={() => onNavigate?.('account')}>View service</button>
                </div>
              </article>
            ))}
            {visibleProviders.length === 0 && <p className={styles.empty}>No providers match your search and filters. Try changing your selections.</p>}
          </div>
          <div className={styles.statusNote}><strong>State example · Loading providers</strong><br />Refreshing availability. Your filters stay in place; provider cards remain readable.</div>
        </section>
      </div>
      <button className={styles.backHome} onClick={onHome}>← Back to KHUB home</button>
    </main>
  );
}