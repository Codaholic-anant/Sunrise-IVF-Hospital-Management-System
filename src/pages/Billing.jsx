import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiDownload } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';
import { useCurrency } from '../context/CurrencyContext';
import { generateInvoicePDF } from '../utils/invoicePDF';

const empty = { patient: '', date: '', amount: '', paid: '', description: '' };
const statuses = ['All', 'Paid', 'Unpaid', 'Partial'];

export default function Billing() {
  const [bills, setBills]     = useLocalStorage('hms_billing');
  const [settings]            = useLocalStorage('hms_settings', {});
  const { currency }          = useCurrency();
  const sym                   = currency.symbol;

  const [modal, setModal]         = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(empty);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (b) => { setEditing(b); setForm(b); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const amount  = parseFloat(form.amount) || 0;
    const paid    = parseFloat(form.paid)   || 0;
    const balance = Math.max(0, amount - paid).toFixed(2);
    const status  = paid === 0 ? 'Unpaid' : paid >= amount ? 'Paid' : 'Partial';
    const record  = { ...form, amount: amount.toFixed(2), paid: paid.toFixed(2), balance, status };
    if (editing) {
      setBills(bills.map((b) => (b.id === editing.id ? { ...record, id: editing.id } : b)));
    } else {
      setBills([...bills, { ...record, id: genId('INV') }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this invoice?')) setBills(bills.filter((b) => b.id !== id));
  };

  const handlePDF = (bill) => generateInvoicePDF(bill, settings, sym);

  const totalCollected = bills.reduce((s, b) => s + parseFloat(b.paid || 0), 0);

  const filtered = bills.filter((b) => {
    const matchSearch = b.patient?.toLowerCase().includes(search.toLowerCase()) || b.id?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: 'id',      label: 'Invoice ID' },
    { key: 'patient', label: 'Patient'    },
    { key: 'date',    label: 'Date'       },
    { key: 'amount',  label: 'Amount',    render: (r) => `${sym}${r.amount}` },
    { key: 'paid',    label: 'Paid',      render: (r) => `${sym}${r.paid}`   },
    { key: 'balance', label: 'Balance',   render: (r) => `${sym}${r.balance}`},
    { key: 'status',  label: 'Status',    render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewModal(r)} title="View"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all"><FiEye size={15} /></button>
          <button onClick={() => handlePDF(r)} title="Download PDF"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-violet-50 hover:text-violet-600 transition-all"><FiDownload size={15} /></button>
          <button onClick={() => openEdit(r)} title="Edit"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"><FiEdit2 size={15} /></button>
          <button onClick={() => handleDelete(r.id)} title="Delete"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"><FiTrash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Billing</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage invoices and payments · {bills.length} total · Currency: {currency.label}</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Create Invoice</Button>
      </div>

      {/* Summary mini-cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Invoices',  value: bills.length,                                    color: 'text-slate-700'   },
          { label: 'Paid',            value: bills.filter(b => b.status === 'Paid').length,   color: 'text-emerald-600' },
          { label: 'Unpaid',          value: bills.filter(b => b.status === 'Unpaid').length, color: 'text-rose-500'    },
          { label: 'Total Collected', value: `${sym}${totalCollected.toFixed(2)}`,            color: 'text-teal-600'    },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <p className="text-xs text-slate-400">{label}</p>
            <p className={`text-xl font-bold mt-0.5 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or invoice ID..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-400'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {/* Create / Edit Modal */}
      {modal && (
        <Modal title={editing ? 'Edit Invoice' : 'Create Invoice'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Patient Name"><Input required placeholder="Patient full name" value={form.patient} onChange={f('patient')} /></FormField>
            <FormField label="Date"><Input required type="date" value={form.date} onChange={f('date')} /></FormField>
            <FormField label={`Total Amount (${sym})`}><Input required type="number" min="0" step="0.01" placeholder="0.00" value={form.amount} onChange={f('amount')} /></FormField>
            <FormField label={`Amount Paid (${sym})`}><Input required type="number" min="0" step="0.01" placeholder="0.00" value={form.paid} onChange={f('paid')} /></FormField>
            <div className="sm:col-span-2">
              <FormField label="Description"><Input placeholder="Services rendered..." value={form.description} onChange={f('description')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Create Invoice'}</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Invoice Modal */}
      {viewModal && (
        <Modal title={`Invoice — ${viewModal.id}`} onClose={() => setViewModal(null)} size="sm">
          <div className="space-y-1">
            {[
              ['Patient',      viewModal.patient],
              ['Date',         viewModal.date],
              ['Description',  viewModal.description || '—'],
              ['Total Amount', `${sym}${viewModal.amount}`],
              ['Amount Paid',  `${sym}${viewModal.paid}`],
              ['Balance Due',  `${sym}${viewModal.balance}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
                <span className="text-xs text-slate-400 font-medium">{label}</span>
                <span className="text-sm text-slate-700 font-semibold">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2.5">
              <span className="text-xs text-slate-400 font-medium">Status</span>
              <StatusBadge status={viewModal.status} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Button onClick={() => handlePDF(viewModal)} className="w-full justify-center">
              <FiDownload /> Download PDF Invoice
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
