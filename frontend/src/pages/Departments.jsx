import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FormField, { Input } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { name: '', head: '', staff: '', phone: '', location: '' };

export default function Departments() {
  const [departments, setDepartments] = useLocalStorage('hms_departments');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (d) => { setEditing(d); setForm(d); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setDepartments(departments.map((d) => (d.id === editing.id ? { ...form, id: editing.id } : d)));
    } else {
      setDepartments([...departments, { ...form, id: genId('DEPT') }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this department?')) setDepartments(departments.filter((d) => d.id !== id));
  };

  const filtered = departments.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.head?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id',       label: 'Dept. ID'    },
    { key: 'name',     label: 'Department'  },
    { key: 'head',     label: 'Head Doctor' },
    { key: 'staff',    label: 'Staff Count' },
    { key: 'phone',    label: 'Extension'   },
    { key: 'location', label: 'Location'    },
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
          <h2 className="text-xl font-bold text-slate-800">Departments</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage hospital departments · {departments.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Department</Button>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search departments..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Department' : 'Add Department'} onClose={() => setModal(false)}>
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Department Name"><Input required placeholder="e.g. Cardiology" value={form.name} onChange={f('name')} /></FormField>
            <FormField label="Head Doctor"><Input required placeholder="Dr. Name" value={form.head} onChange={f('head')} /></FormField>
            <FormField label="Staff Count"><Input type="number" min="0" placeholder="0" value={form.staff} onChange={f('staff')} /></FormField>
            <FormField label="Extension"><Input placeholder="e.g. 101" value={form.phone} onChange={f('phone')} /></FormField>
            <div className="sm:col-span-2">
              <FormField label="Location / Floor"><Input placeholder="e.g. Block A, Floor 2" value={form.location} onChange={f('location')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Department'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
