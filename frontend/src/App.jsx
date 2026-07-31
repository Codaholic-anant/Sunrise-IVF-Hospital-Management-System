import { HashRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/patients/PatientDetail";
import Doctors from "./pages/Doctors";
// import DoctorDetail from "./pages/doctors/DoctorDetail";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Admins from "./pages/Admins";
import PatientRegistration from "./pages/PatientRegistration";
//imports Doctors layout
import DoctorDashboard from "./pages/doctors/DoctorDashboards";
import DoctorLayout from "./layouts/DoctorLayout";
import DocPatients from "./pages/doctors/DocPatients";
import DocPatientDetails from "./pages/doctors/DocPateintDetails";
import DocPrescription from "./pages/doctors/DocPrescriptions";
import DocCreatePrescription from "./pages/doctors/DocCreatePrescription";
import DocAppointments from "./pages/doctors/DocAppoinments";
import DocGenPrescription from "./pages/doctors/DocGenPrescription";
import { DocMedicalHistory } from "./pages/doctors/DocMedicalHistory";
import DocTestReports from "./pages/doctors/DocTestReports";
import DoctorProfile from "./pages/doctors/DoctorProfile"

// MasterImports

import HospitalMaster from "../src/pages/masters/HospitalMaster";


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patientregistration" element={<PatientRegistration />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Patients */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />

          {/* Doctors */}
          {/* <Route path="/doctors"          element={<Doctors />}      />
            <Route index element={<DoctorDashboard />} />
          <Route path="/doctors/:id"      element={<DoctorDetail />} /> */}

          {/* Other modules */}
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<DoctorLayout />}>
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/doctors/patients" element={<DocPatients />} />
          <Route path="/doctor/patient/:id" element={<DocPatientDetails />} />
          <Route path="/doctors/test-reports"element={<DocTestReports />}/>          <Route path="/doctor/history" element={<DocMedicalHistory />} />
          <Route path="/doctors/patient/:id/prescription" element={<DocPrescription />}/>

          <Route path="/doctors/patient/:id/prescription/new" element={<DocCreatePrescription />}/>
          <Route path="/doctors/appointments" element={<DocAppointments />} />
          <Route path="/doctors/all-prescriptions" element={<DocGenPrescription />}/>
          <Route path="/doctor/profile" element={<DoctorProfile />} />
        </Route>

        {/* MasterPages */}
        {/* <Route element={<AdminLayout />}> */}
        <Route path="/hospital-master" element={<HospitalMaster />} />
       
        {/* </Route> */}
      </Routes>
    </HashRouter>
  );
}
