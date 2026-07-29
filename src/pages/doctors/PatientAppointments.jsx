import { FiCalendar, FiClock, FiEye } from "react-icons/fi";

export default function PatientAppointments({ patientId }) {
  const appointments = [
    {
      id: "APT001",
      date: "30 Jul 2026",
      time: "10:30 AM",
      doctor: "Dr. Sharma",
      department: "General Medicine",
      type: "Follow-up",
      status: "Upcoming",
    },
    {
      id: "APT002",
      date: "18 Jul 2026",
      time: "11:00 AM",
      doctor: "Dr. Sharma",
      department: "General Medicine",
      type: "Consultation",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Patient Appointments</h2>
          <p className="text-gray-500">
            Appointment history for Patient ID: {patientId}
          </p>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-3 text-left">Appointment ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{item.id}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FiCalendar />
                    {item.date}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FiClock />
                    {item.time}
                  </div>
                </td>
                <td className="p-3">{item.doctor}</td>
                <td className="p-3">{item.department}</td>
                <td className="p-3">{item.type}</td>

                <td className="p-3">
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

                <td className="p-3 text-center">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg mx-auto">
                    <FiEye />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}