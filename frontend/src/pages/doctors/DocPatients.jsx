import { useState } from "react";
import { FiSearch, FiEye, FiPhone, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DocPatients() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const patients = [
    {
      id: "P001",
      name: "Rahul Kumar",
      age: 28,
      gender: "Male",
      phone: "9876543210",
      blood: "B+",
      status: "Waiting",
    },
    {
      id: "P002",
      name: "Neha Sharma",
      age: 35,
      gender: "Female",
      phone: "9876501234",
      blood: "A+",
      status: "Checked",
    },
    {
      id: "P003",
      name: "Aman Singh",
      age: 40,
      gender: "Male",
      phone: "9898989898",
      blood: "O+",
      status: "Waiting",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search),
  );


  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Patient Details</h1>

        <p className="text-slate-500 mt-2">Search and manage your patients.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by Patient ID, Name or Phone Number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4 text-left">Patient ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Blood</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{patient.id}</td>

                <td className="p-4">{patient.name}</td>

                <td className="p-4">{patient.age}</td>

                <td className="p-4">{patient.gender}</td>

                <td className="p-4">{patient.phone}</td>

                <td className="p-4">{patient.blood}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      patient.status === "Waiting"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
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
