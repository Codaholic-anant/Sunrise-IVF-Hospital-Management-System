import {
  FiBell,
  FiSearch,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

export default function DoctorNavbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8">

      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          {today}
        </p>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex w-96">
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

          <input
            type="text"
            placeholder="Search patient..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-xl bg-slate-100 hover:bg-teal-50 transition flex items-center justify-center">

          <FiBell className="text-xl text-slate-600" />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

        </button>

        {/* Doctor Profile */}
        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center">
            <FiUser />
          </div>

          <div className="hidden md:block">

            <h3 className="font-semibold text-slate-700">
              Dr. Sharma
            </h3>

            <p className="text-xs text-slate-500">
              Cardiologist
            </p>

          </div>

          <FiChevronDown className="text-slate-400" />

        </div>

      </div>

    </header>
  );
}