import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCurrency, currencies } from '../context/CurrencyContext';
import { FiSave, FiCheck } from 'react-icons/fi';
import { DEFAULT_HOSPITAL_SETTINGS, LEGACY_HOSPITAL_SETTINGS } from '../config/brand';

const inputCls = 'w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all';

function SettingRow({ label, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useLocalStorage('hms_settings', DEFAULT_HOSPITAL_SETTINGS);
  const { currency, setCurrency } = useCurrency();
  const normalizedSettings = useMemo(() => ({
    ...DEFAULT_HOSPITAL_SETTINGS,
    ...settings,
    hospitalName: settings?.hospitalName === LEGACY_HOSPITAL_SETTINGS.hospitalName
      ? DEFAULT_HOSPITAL_SETTINGS.hospitalName
      : (settings?.hospitalName || DEFAULT_HOSPITAL_SETTINGS.hospitalName),
    email: settings?.email === LEGACY_HOSPITAL_SETTINGS.email
      ? DEFAULT_HOSPITAL_SETTINGS.email
      : (settings?.email || DEFAULT_HOSPITAL_SETTINGS.email),
  }), [settings]);
  const [form, setForm] = useState(normalizedSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(normalizedSettings);
    if (JSON.stringify(settings) !== JSON.stringify(normalizedSettings)) {
      setSettings(normalizedSettings);
    }
  }, [normalizedSettings, setSettings, settings]);

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage hospital profile and system preferences</p>
      </div>

      {/* Hospital Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Hospital Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          {[
            { key: 'hospitalName', label: 'Hospital Name', placeholder: `e.g. ${DEFAULT_HOSPITAL_SETTINGS.hospitalName}` },
            { key: 'address',      label: 'Address',       placeholder: 'Street, City, Country'          },
            { key: 'phone',        label: 'Phone',         placeholder: '+91 98765 43210'                 },
            { key: 'email',        label: 'Email',         placeholder: 'info@hospital.com'               },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
              <input type="text" placeholder={placeholder} value={form[key] || ''} onChange={f(key)} className={inputCls} />
            </div>
          ))}
          <button type="submit"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${saved ? 'bg-emerald-500 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-200'}`}>
            {saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Profile</>}
          </button>
        </form>
      </div>

      {/* System Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-2 pb-3 border-b border-slate-100">System Preferences</h3>
        <SettingRow label="Email Notifications" description="Receive alerts for new appointments">
          <input type="checkbox" className="w-4 h-4 accent-teal-600" />
        </SettingRow>
        <SettingRow label="SMS Notifications" description="Send SMS reminders to patients">
          <input type="checkbox" className="w-4 h-4 accent-teal-600" />
        </SettingRow>
        <SettingRow label="Currency" description="Used across billing, invoices and reports">
          <select
            value={currency.code}
            onChange={(e) => setCurrency(currencies.find(c => c.code === e.target.value))}
            className="border border-slate-200 rounded-lg text-sm px-3 py-1.5 text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {currencies.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
        </SettingRow>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-slate-100">Change Password</h3>
        <div className="space-y-4">
          {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
              <input type="password" placeholder="••••••••" className={inputCls} />
            </div>
          ))}
          <Button>Update Password</Button>
        </div>
      </div>
    </div>
  );
}
