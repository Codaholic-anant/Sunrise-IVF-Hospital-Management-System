import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Patients ──────────────────────────────────────────────
export const getPatients   = ()       => api.get('/patients');
export const getPatient    = (id)     => api.get(`/patients/${id}`);
export const createPatient = (data)   => api.post('/patients', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id)     => api.delete(`/patients/${id}`);

// ── Doctors ───────────────────────────────────────────────
export const getDoctors   = ()       => api.get('/doctors');
export const getDoctor    = (id)     => api.get(`/doctors/${id}`);
export const createDoctor = (data)   => api.post('/doctors', data);
export const updateDoctor = (id, data) => api.put(`/doctors/${id}`, data);
export const deleteDoctor = (id)     => api.delete(`/doctors/${id}`);

// ── Appointments ──────────────────────────────────────────
export const getAppointments   = ()       => api.get('/appointments');
export const createAppointment = (data)   => api.post('/appointments', data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id)     => api.delete(`/appointments/${id}`);

// ── Departments ───────────────────────────────────────────
export const getDepartments   = ()     => api.get('/departments');
export const createDepartment = (data) => api.post('/departments', data);

// ── Pharmacy ──────────────────────────────────────────────
export const getMedicines   = ()     => api.get('/pharmacy');
export const createMedicine = (data) => api.post('/pharmacy', data);

// ── Laboratory ────────────────────────────────────────────
export const getLabTests   = ()     => api.get('/laboratory');
export const createLabTest = (data) => api.post('/laboratory', data);

// ── Billing ───────────────────────────────────────────────
export const getBills   = ()     => api.get('/billing');
export const createBill = (data) => api.post('/billing', data);

// ── Reports ───────────────────────────────────────────────
export const getReports = () => api.get('/reports');

// ── Dashboard ─────────────────────────────────────────────
export const getDashboardStats = () => api.get('/dashboard/stats');

export default api;
