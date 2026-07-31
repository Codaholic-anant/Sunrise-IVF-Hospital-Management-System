import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEye } from "react-icons/fi";

export default function DocTestReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const reports = [
    {
      id: "RPT001",
      patientId: "PAT001",
      patient: "Rahul Kumar",
      report: "Complete Blood Count (CBC)",
      category: "Blood Test",
      date: "20 Jul 2026",
      status: "Completed",
    },
    {
      id: "RPT002",
      patientId: "PAT002",
      patient: "Ankit Singh",
      report: "Chest X-Ray",
      category: "Radiology",
      date: "18 Jul 2026",
      status: "Completed",
    },
    {
      id: "RPT003",
      patientId: "PAT003",
      patient: "Priya Sharma",
      report: "Blood Sugar",
      category: "Blood Test",
      date: "17 Jul 2026",
      status: "Pending",
    },
  ];

  const filteredReports = reports.filter(
    (item) =>
      item.patient.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Test Reports
        </h1>

        <p className="text-slate-500">
          Test reports of your patients
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
              <th className="text-left">Report</th>
              <th className="text-left">Category</th>
              <th className="text-left">Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredReports.map((item) => (

              <tr key={item.id} className="border-b hover:bg-slate-50">

                <td className="p-4 font-medium">
                  {item.patient}
                </td>

                <td>{item.patientId}</td>

                <td>{item.report}</td>

                <td>{item.category}</td>

                <td>{item.date}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
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

          </tbody>

        </table>
      </div>

    </div>
  );
}