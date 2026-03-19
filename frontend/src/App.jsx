import { useState } from 'react';
import './app.css';
import Customers from './components/Customers';
import Products from './components/Products';

const NAV_ITEMS = [
  {
    id: 'customers',
    label: 'Customers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'products',
    label: 'Products',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
];

export default function App() {
  const [tab, setTab] = useState('customers');

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <span className="logo-title">OrderMgr</span>
          </div>
          <div className="logo-subtitle">v1.0 · local dev</div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">Data</div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`nav-item${tab === item.id ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
              <span className="nav-badge">DB</span>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="status-chip">
            <div className="status-dot" />
            <div className="status-label">
              Django API
              <span>localhost:8000</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        <header className="topbar">
          <nav className="breadcrumb">
            <span>OrderMgr</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">
              {tab === 'customers' ? 'Customers' : 'Products'}
            </span>
          </nav>
          <div className="topbar-actions">
            <div className="server-badge">
              ⚡ Run <code>python manage.py runserver</code> before using
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="tab-content" key={tab}>
            {tab === 'customers' && <Customers />}
            {tab === 'products' && <Products />}
          </div>
        </main>
      </div>
    </div>
  );
}
