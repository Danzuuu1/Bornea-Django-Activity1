import { useState, useEffect } from 'react';
import { productsApi } from '../api';

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ product_name: '', price: '' });
  const [isCreating, setIsCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.list();
      setItems(Array.isArray(data) ? data : data.results ?? []);
    } catch (e) {
      setError(e.data?.detail || e.message || 'Failed to load products');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({ product_name: '', price: '' });
    setEditing(null);
    setIsCreating(true);
  };

  const openEdit = (p) => {
    setForm({ product_name: p.product_name, price: String(p.price) });
    setEditing(p.product_id);
    setIsCreating(false);
  };

  const cancelForm = () => {
    setForm({ product_name: '', price: '' });
    setEditing(null);
    setIsCreating(false);
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    const name = form.product_name.trim();
    const price = parseFloat(form.price);
    if (!name || Number.isNaN(price) || price < 0) return;
    try {
      await productsApi.create({ product_name: name, price });
      cancelForm();
      await load();
    } catch (e) {
      const msg = e.data?.product_name?.[0] || e.data?.price?.[0] || e.data?.detail || 'Create failed';
      setError(msg);
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const name = form.product_name.trim();
    const price = parseFloat(form.price);
    if (!name || Number.isNaN(price) || price < 0 || editing == null) return;
    try {
      await productsApi.update(editing, { product_name: name, price });
      cancelForm();
      await load();
    } catch (e) {
      setError(e.data?.product_name?.[0] || e.data?.price?.[0] || e.data?.detail || 'Update failed');
    }
  };

  const deleteOne = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productsApi.delete(id);
      await load();
    } catch (e) {
      setError(e.data?.detail || 'Delete failed');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Products</h2>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Add Product
        </button>
      </div>
      <div className="p-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}
        {(isCreating || editing != null) && (
          <form
            onSubmit={isCreating ? submitCreate : submitUpdate}
            className="mb-6 flex flex-wrap items-end gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50"
          >
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Product name</span>
              <input
                type="text"
                value={form.product_name}
                onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                className="w-56 rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Name"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Price</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-28 rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                placeholder="0.00"
              />
            </label>
            <button type="submit" className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500">
              {isCreating ? 'Create' : 'Update'}
            </button>
            <button type="button" onClick={cancelForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-600">
              Cancel
            </button>
          </form>
        )}
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No products yet. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 dark:border-slate-600 dark:text-slate-400">
                  <th className="pb-2 pr-4 font-medium">ID</th>
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 pr-4 font-medium">Price</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.product_id} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-3 pr-4 text-slate-700 dark:text-slate-300">{p.product_id}</td>
                    <td className="py-3 pr-4 text-slate-900 dark:text-slate-100">{p.product_name}</td>
                    <td className="py-3 pr-4 text-slate-700 dark:text-slate-300">{Number(p.price).toFixed(2)}</td>
                    <td className="py-3">
                      <button type="button" onClick={() => openEdit(p)} className="mr-2 text-amber-600 hover:underline dark:text-amber-400">Edit</button>
                      <button type="button" onClick={() => deleteOne(p.product_id)} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
