import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEye } from "react-icons/fi";

export default function DocGenPrescription() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const prescriptions = [
    {
      id: "PR001",
      patientId: "PAT001",
      patient: "Rahul Kumar",
      date: "22 Jul 2026",
      diagnosis: "Fever",
      medicines: 4,
      status: "Completed",
    },
    {
      id: "PR002",
      patientId: "PAT002",
      patient: "Ankit Singh",
      date: "18 Jul 2026",
      diagnosis: "Hypertension",
      medicines: 3,
      status: "Completed",
    },
    {
      id: "PR003",
      patientId: "PAT003",
      patient: "Priya Sharma",
      date: "15 Jul 2026",
      diagnosis: "Diabetes",
      medicines: 5,
      status: "Completed",
    },
  ];

  const filtered = prescriptions.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Prescriptions
        </h1>

        <p className="text-slate-500">
          All prescriptions written by you
        </p>
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
              <th className="text-left">Diagnosis</th>
              <th className="text-center">Medicines</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{item.patient}</td>

                <td>{item.patientId}</td>

                <td>{item.date}</td>

                <td>{item.diagnosis}</td>

                <td className="text-center">{item.medicines}</td>

                <td className="text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      navigate(`/doctors/patient/:id/prescription`)
                    }
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <FiEye />
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}