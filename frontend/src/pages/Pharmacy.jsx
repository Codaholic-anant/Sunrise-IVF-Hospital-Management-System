import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { name: '', category: '', stock: '', unit: '', price: '', expiry: '', supplier: '' };
const categories = ['Antibiotic','Analgesic','Antiviral','Antifungal','Vitamin','Vaccine','Cardiac','Diabetic','Other'];

export default function Pharmacy() {
  const [medicines, setMedicines] = useLocalStorage('hms_pharmacy');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (m) => { setEditing(m); setForm(m); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const stock = parseInt(form.stock) || 0;
    const status = stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low' : 'Available';
    const record = { ...form, stock, status };
    if (editing) {
      setMedicines(medicines.map((m) => (m.id === editing.id ? { ...record, id: editing.id } : m)));
    } else {
      setMedicines([...medicines, { ...record, id: genId('MED') }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this medicine?')) setMedicines(medicines.filter((m) => m.id !== id));
  };

  const lowStock = medicines.filter((m) => m.status === 'Low' || m.status === 'Out of Stock');

  const filtered = medicines.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.category?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id',       label: 'Med. ID'  },
    { key: 'name',     label: 'Medicine' },
    { key: 'category', label: 'Category' },
    { key: 'stock',    label: 'Stock',   render: (r) => (
      <span className={`font-semibold ${r.stock <= 10 ? 'text-rose-500' : 'text-slate-700'}`}>{r.stock} {r.unit}</span>
    )},
    { key: 'price',    label: 'Price',   render: (r) => `$${r.price}` },
    { key: 'expiry',   label: 'Expiry'   },
    { key: 'supplier', label: 'Supplier' },
    { key: 'status',   label: 'Status',  render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"><FiEdit2 size={15} /></button>
          <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"><FiTrash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pharmacy</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage medicine inventory · {medicines.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Medicine</Button>
      </div>

      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <FiAlertTriangle className="text-amber-500 shrink-0" />
          <p className="text-sm text-amber-700 font-medium">
            {lowStock.length} medicine{lowStock.length > 1 ? 's are' : ' is'} low on stock or out of stock.
          </p>
        </div>
      )}

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicines..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Medicine' : 'Add Medicine'} onClose={() => setModal(false)} size="lg">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Medicine Name"><Input required placeholder="e.g. Paracetamol" value={form.name} onChange={f('name')} /></FormField>
            <FormField label="Category">
              <Select value={form.category} onChange={f('category')} required>
                <option value="">Select category</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </Select>
            </FormField>
            <FormField label="Stock Quantity"><Input required type="number" min="0" placeholder="0" value={form.stock} onChange={f('stock')} /></FormField>
            <FormField label="Unit"><Input placeholder="e.g. Tablets, ml, mg" value={form.unit} onChange={f('unit')} /></FormField>
            <FormField label="Price ($)"><Input required type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={f('price')} /></FormField>
            <FormField label="Expiry Date"><Input required type="date" value={form.expiry} onChange={f('expiry')} /></FormField>
            <div className="sm:col-span-2">
              <FormField label="Supplier"><Input placeholder="Supplier name" value={form.supplier} onChange={f('supplier')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Medicine'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
