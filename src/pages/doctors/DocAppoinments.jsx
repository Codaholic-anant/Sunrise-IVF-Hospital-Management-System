import { useState } from "react";
import { FiSearch, FiEye, FiCalendar, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


export default function DocAppointments() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const appointments = [
    {
      id: "APT001",
      patient: "Rahul Kumar",
      patientId: "PAT001",
      date: "30 Jul 2026",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Upcoming",
    },
    {
      id: "APT002",
      patient: "Ankit Singh",
      patientId: "PAT002",
      date: "30 Jul 2026",
      time: "11:00 AM",
      type: "Consultation",
      status: "Completed",
    },
    {
      id: "APT003",
      patient: "Priya Sharma",
      patientId: "PAT003",
      date: "31 Jul 2026",
      time: "09:30 AM",
      type: "IVF Review",
      status: "Upcoming",
    },
  ];

  const filteredAppointments = appointments.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Appointments
          </h1>
          <p className="text-slate-500">
            All appointments assigned to you
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-80">
        <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-2"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4 text-left">Patient</th>
              <th className="text-left">Patient ID</th>
              <th className="text-left">Date</th>
              <th className="text-left">Time</th>
              <th className="text-left">Type</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{item.patient}</td>

                <td>{item.patientId}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <FiCalendar size={15} />
                    {item.date}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <FiClock size={15} />
                    {item.time}
                  </div>
                </td>

                <td>{item.type}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Upcoming"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
    onClick={() =>
        navigate(`/doctors/patient/${item.patientId}`)
    }
    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
    <FiEye />
    View
</button>
                </td>
              </tr>
            ))}

            {filteredAppointments.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}