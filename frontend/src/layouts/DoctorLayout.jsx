import { Outlet } from "react-router-dom";
import DoctorSidebar from "../components/doctorsComponents/DoctorSidebar";
import DoctorNavbar from "../components/doctorsComponents/DoctorsNavbar";

export default function DoctorLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DoctorNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}