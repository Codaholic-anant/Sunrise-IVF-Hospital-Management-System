import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select, Textarea } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { patient: '', doctor: '', test: '', date: '', result: '', notes: '', status: 'Pending' };
const testTypes = ['Blood Test','Urine Test','X-Ray','MRI','CT Scan','ECG','Ultrasound','Biopsy','Culture Test','COVID-19 PCR'];
const statuses = ['All','Pending','Completed'];

export default function Laboratory() {
  const [tests, setTests] = useLocalStorage('hms_laboratory');
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (t) => { setEditing(t); setForm(t); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setTests(tests.map((t) => (t.id === editing.id ? { ...form, id: editing.id } : t)));
    } else {
      setTests([...tests, { ...form, id: genId('LAB') }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this lab test?')) setTests(tests.filter((t) => t.id !== id));
  };

  const filtered = tests.filter((t) => {
    const matchSearch = t.patient?.toLowerCase().includes(search.toLowerCase()) || t.test?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: 'id',      label: 'Test ID'     },
    { key: 'patient', label: 'Patient'     },
    { key: 'test',    label: 'Test Name'   },
    { key: 'doctor',  label: 'Referred By' },
    { key: 'date',    label: 'Date'        },
    { key: 'result',  label: 'Result',     render: (r) => r.result ? <StatusBadge status={r.result} /> : '—' },
    { key: 'status',  label: 'Status',     render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setViewModal(r)} className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all"><FiEye size={15} /></button>
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
          <h2 className="text-xl font-bold text-slate-800">Laboratory</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage lab tests and results · {tests.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Test</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or test..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
        </div>
        <div className="flex gap-2">
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

      {modal && (
        <Modal title={editing ? 'Edit Lab Test' : 'Add Lab Test'} onClose={() => setModal(false)} size="lg">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Patient Name"><Input required placeholder="Patient full name" value={form.patient} onChange={f('patient')} /></FormField>
            <FormField label="Referred By (Doctor)"><Input required placeholder="Dr. Name" value={form.doctor} onChange={f('doctor')} /></FormField>
            <FormField label="Test Name">
              <Select value={form.test} onChange={f('test')} required>
                <option value="">Select test</option>
                {testTypes.map(t => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Date"><Input required type="date" value={form.date} onChange={f('date')} /></FormField>
            <FormField label="Result">
              <Select value={form.result} onChange={f('result')}>
                <option value="">Pending</option>
                <option>Normal</option><option>Abnormal</option>
              </Select>
            </FormField>
            <FormField label="Status">
              <Select value={form.status} onChange={f('status')}>
                <option>Pending</option><option>Completed</option>
              </Select>
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Notes"><Textarea placeholder="Additional notes or findings..." value={form.notes} onChange={f('notes')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Test'}</Button>
            </div>
          </form>
        </Modal>
      )}

      {viewModal && (
        <Modal title={`Lab Result — ${viewModal.id}`} onClose={() => setViewModal(null)} size="sm">
          <div className="space-y-3">
            {[['Patient', viewModal.patient],['Test', viewModal.test],['Referred By', viewModal.doctor],['Date', viewModal.date],['Notes', viewModal.notes || '—']].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-xs text-slate-400 font-medium">{label}</span>
                <span className="text-sm text-slate-700 font-semibold">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span className="text-xs text-slate-400 font-medium">Result</span>
              {viewModal.result ? <StatusBadge status={viewModal.result} /> : <span className="text-sm text-slate-400">Pending</span>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
