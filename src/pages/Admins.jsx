import { useState } from 'react';
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiShield, FiCheck, FiX,
} from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const modules = [
  'Dashboard',
  'Patients',
  'Doctors',
  'Appointments',
  'Departments',
  'Pharmacy',
  'Laboratory',
  'Billing',
  'Reports',
  'Settings',
];

const emptyPermissions = modules.reduce((acc, module) => ({ ...acc, [module]: false }), {});

const empty = {
  name: '',
  email: '',
  phone: '',
  role: 'Admin',
  status: 'Active',
  permissions: emptyPermissions,
};

const superAdmin = {
  id: 'SA-001',
  name: 'Super Admin',
  email: 'superadmin@hospital.com',
  phone: '+91 98765 43210',
  role: 'Super Admin',
  status: 'Active',
  permissions: modules.reduce((acc, module) => ({ ...acc, [module]: true }), {}),
};

export default function Admins() {
  const [admins, setAdmins] = useLocalStorage('hms_admins', [superAdmin]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setModal(true);
  };

  const openEdit = (admin) => {
    setEditing(admin);
    setForm({
      ...empty,
      ...admin,
      permissions: { ...emptyPermissions, ...admin.permissions },
    });
    setModal(true);
  };

  const togglePermission = (module) => {
    setForm({
      ...form,
      permissions: {
        ...form.permissions,
        [module]: !form.permissions?.[module],
      },
    });
  };

  const toggleAllPermissions = (allowed) => {
    setForm({
      ...form,
      permissions: modules.reduce((acc, module) => ({ ...acc, [module]: allowed }), {}),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      permissions: { ...emptyPermissions, ...form.permissions },
    };

    if (editing) {
      setAdmins(admins.map((admin) => (admin.id === editing.id ? { ...payload, id: editing.id } : admin)));
    } else {
      setAdmins([...admins, { ...payload, id: genId('ADM') }]);
    }

    setModal(false);
  };

  const handleDelete = (admin) => {
    if (admin.role === 'Super Admin') return;
    if (confirm('Delete this admin?')) setAdmins(admins.filter((item) => item.id !== admin.id));
  };

  const filtered = admins.filter((admin) =>
    admin.name?.toLowerCase().includes(search.toLowerCase()) ||
    admin.email?.toLowerCase().includes(search.toLowerCase()) ||
    admin.role?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id', label: 'Admin ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'access',
      label: 'Access',
      render: (admin) => {
        const count = modules.filter((module) => admin.permissions?.[module]).length;
        return <span className="text-slate-600">{count}/{modules.length} modules</span>;
      },
    },
    { key: 'status', label: 'Status', render: (admin) => <StatusBadge status={admin.status} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (admin) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openEdit(admin)} className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all">
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => handleDelete(admin)}
            disabled={admin.role === 'Super Admin'}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Admin Access</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage admin users and module permissions · {admins.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Admin</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600"><FiShield /></div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Super Admin</p>
              <p className="text-xl font-bold text-slate-800">Full Access</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Active Admins</p>
          <p className="text-xl font-bold text-emerald-700 mt-1">{admins.filter((admin) => admin.status === 'Active').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Controlled Modules</p>
          <p className="text-xl font-bold text-teal-700 mt-1">{modules.length}</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, role..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Admin Access' : 'Add New Admin'} onClose={() => setModal(false)} size="xl">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Full Name"><Input required placeholder="Admin name" value={form.name} onChange={f('name')} /></FormField>
              <FormField label="Email"><Input required type="email" placeholder="admin@hospital.com" value={form.email} onChange={f('email')} /></FormField>
              <FormField label="Phone"><Input placeholder="+91 98765 43210" value={form.phone} onChange={f('phone')} /></FormField>
              <FormField label="Role">
                <Select value={form.role} onChange={f('role')} disabled={editing?.role === 'Super Admin'}>
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Receptionist</option>
                  <option>Super Admin</option>
                </Select>
              </FormField>
              <FormField label="Status">
                <Select value={form.status} onChange={f('status')}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </Select>
              </FormField>
            </div>

            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Module Access Control</p>
                  <p className="text-xs text-slate-400 mt-0.5">Choose what this admin can open and manage</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" className="px-3 py-1.5" onClick={() => toggleAllPermissions(true)}>Allow All</Button>
                  <Button type="button" variant="secondary" className="px-3 py-1.5" onClick={() => toggleAllPermissions(false)}>Clear</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {modules.map((module) => {
                  const allowed = Boolean(form.permissions?.[module]);
                  return (
                    <button
                      type="button"
                      key={module}
                      onClick={() => togglePermission(module)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border text-sm transition-all
                        ${allowed ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      <span className="font-medium">{module}</span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center ${allowed ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {allowed ? <FiCheck size={14} /> : <FiX size={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Admin'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
