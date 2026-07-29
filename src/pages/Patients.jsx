import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { name: '', age: '', gender: '', phone: '', email: '', address: '', bloodGroup: '', doctor: '', status: 'Active' };

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useLocalStorage('hms_patients');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm(p); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setPatients(patients.map((p) => (p.id === editing.id ? { ...form, id: editing.id } : p)));
    } else {
      setPatients([...patients, { ...form, id: genId('P'), date: new Date().toLocaleDateString() }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this patient?')) setPatients(patients.filter((p) => p.id !== id));
  };

  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search) ||
    p.id?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id',         label: 'Patient ID' },
    { key: 'name',       label: 'Full Name'  },
    { key: 'age',        label: 'Age'        },
    { key: 'gender',     label: 'Gender'     },
    { key: 'phone',      label: 'Phone'      },
    { key: 'bloodGroup', label: 'Blood'      },
    { key: 'doctor',     label: 'Doctor'     },
    { key: 'status',     label: 'Status',    render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/patients/${r.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all"><FiEye size={15} /></button>
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
          <h2 className="text-xl font-bold text-slate-800">Patients</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage all patient records · {patients.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Patient</Button>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, phone, ID..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Patient' : 'Add New Patient'} onClose={() => setModal(false)} size="lg">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full Name"><Input required placeholder="John Doe" value={form.name} onChange={f('name')} /></FormField>
            <FormField label="Age"><Input required type="number" min="0" max="150" placeholder="25" value={form.age} onChange={f('age')} /></FormField>
            <FormField label="Gender">
              <Select value={form.gender} onChange={f('gender')} required>
                <option value="">Select gender</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </Select>
            </FormField>
            <FormField label="Blood Group">
              <Select value={form.bloodGroup} onChange={f('bloodGroup')}>
                <option value="">Select</option>
                {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
              </Select>
            </FormField>
            <FormField label="Phone"><Input required placeholder="+1 555 000 0000" value={form.phone} onChange={f('phone')} /></FormField>
            <FormField label="Email"><Input type="email" placeholder="patient@email.com" value={form.email} onChange={f('email')} /></FormField>
            <FormField label="Assigned Doctor"><Input placeholder="Dr. Smith" value={form.doctor} onChange={f('doctor')} /></FormField>
            <FormField label="Status">
              <Select value={form.status} onChange={f('status')}>
                <option>Active</option><option>Inactive</option><option>Discharged</option>
              </Select>
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Address"><Input placeholder="Street, City, Country" value={form.address} onChange={f('address')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Patient'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
