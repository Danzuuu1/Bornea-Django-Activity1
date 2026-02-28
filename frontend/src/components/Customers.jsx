import { useState, useEffect } from 'react';
import { customersApi } from '../api';

export default function Customers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '' });
  const [isCreating, setIsCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customersApi.list();
      setItems(Array.isArray(data) ? data : data.results ?? []);
    } catch (e) {
      setError(e.data?.detail || e.message || 'Failed to load customers');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setForm({ name: '' });
    setEditing(null);
    setIsCreating(true);
  };

  const openEdit = (c) => {
    setForm({ name: c.name });
    setEditing(c.customer_id);
    setIsCreating(false);
  };

  const cancelForm = () => {
    setForm({ name: '' });
    setEditing(null);
    setIsCreating(false);
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      await customersApi.create({ name: form.name.trim() });
      cancelForm();
      await load();
    } catch (e) {
      setError(e.data?.name?.[0] || e.data?.detail || 'Create failed');
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || editing == null) return;
    try {
      await customersApi.update(editing, { name: form.name.trim() });
      cancelForm();
      await load();
    } catch (e) {
      setError(e.data?.name?.[0] || e.data?.detail || 'Update failed');
    }
  };

  const deleteOne = async (id) => {
    if (!confirm('Delete this customer?')) return;
    try {
      await customersApi.delete(id);
      await load();
    } catch (e) {
      setError(e.data?.detail || 'Delete failed');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Customers</h2>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Add Customer
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
            className="mb-6 flex flex-wrap items-end gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50"
          >
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-64 rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Customer name"
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
          <p className="text-slate-500 dark:text-slate-400">No customers yet. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 dark:border-slate-600 dark:text-slate-400">
                  <th className="pb-2 pr-4 font-medium">ID</th>
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.customer_id} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="py-3 pr-4 text-slate-700 dark:text-slate-300">{c.customer_id}</td>
                    <td className="py-3 pr-4 text-slate-900 dark:text-slate-100">{c.name}</td>
                    <td className="py-3">
                      <button type="button" onClick={() => openEdit(c)} className="mr-2 text-amber-600 hover:underline dark:text-amber-400">Edit</button>
                      <button type="button" onClick={() => deleteOne(c.customer_id)} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
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
