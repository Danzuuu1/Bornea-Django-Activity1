import { useState } from 'react';
import Customers from './components/Customers';
import Products from './components/Products';

function App() {
  const [tab, setTab] = useState('customers');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-800/80">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Order Manager
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            CRUD on localhost — React + Tailwind + Django API
          </p>
          <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-400">
            Start Django first: <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/50">python manage.py runserver</code> (in project root)
          </p>
          <nav className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTab('customers')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === 'customers'
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              Customers
            </button>
            <button
              type="button"
              onClick={() => setTab('products')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === 'products'
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              Products
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {tab === 'customers' && <Customers />}
        {tab === 'products' && <Products />}
      </main>
    </div>
  );
}

export default App;
