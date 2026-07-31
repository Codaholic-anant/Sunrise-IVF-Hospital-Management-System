import { useParams } from "react-router-dom";
import { FiUser, FiPhone, FiMail, FiDroplet, FiX } from "react-icons/fi";
import { useState } from "react";
import DocPrescription from "./DocPrescriptions";
import PatientAppointments from "./PatientAppointments";


export default function PatientDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("information");
  const [selectedReport, setSelectedReport] = useState(null);
  // Dummy Data (later this will come from API)
  const patient = {
    id: id,
    name: "Rahul Kumar",
    age: 28,
    gender: "Male",
    blood: "B+",
    phone: "9876543210",
    email: "rahul@gmail.com",
    address: "Bareilly, Uttar Pradesh",
  };
  const reports = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      category: "Blood Test",
      date: "20 Jul 2026",
      status: "Completed",
    },
    {
      id: 2,
      name: "Blood Sugar",
      category: "Blood Test",
      date: "18 Jul 2026",
      status: "Completed",
    },
    {
      id: 3,
      name: "Chest X-Ray",
      category: "Radiology",
      date: "17 Jul 2026",
      status: "Completed",
    },
    {
      id: 4,
      name: "ECG",
      category: "Cardiology",
      date: "15 Jul 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Patient Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-teal-600 text-white flex items-center justify-center text-5xl">
            <FiUser />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">
              {patient.name}
            </h1>

            <p className="text-slate-500 mt-1">Patient ID : {patient.id}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <h3 className="font-semibold">{patient.age} Years</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <h3 className="font-semibold">{patient.gender}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Blood Group</p>
                <h3 className="font-semibold text-red-600">{patient.blood}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <h3 className="font-semibold flex items-center gap-2">
                  <FiPhone />
                  {patient.phone}
                </h3>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-slate-600">
              <FiMail />
              {patient.email}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-2 flex gap-3">
        <button
          onClick={() => setActiveTab("information")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "information"
              ? "bg-teal-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Information
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "information"
              ? "bg-teal-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Medical History
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "information"
              ? "bg-teal-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Test report
        </button>

        <button
          onClick={() => setActiveTab("prescription")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "information"
              ? "bg-teal-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Prescription
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-5 py-2 rounded-lg ${
            activeTab === "information"
              ? "bg-teal-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          appointments
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {activeTab === "information" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Patient Information</h2>

            <p>Address: {patient.address}</p>

            <p>Email: {patient.email}</p>

            <p>Phone: {patient.phone}</p>
          </div>
        )}

        {/* //medical history */}

        {activeTab === "history" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Medical History
            </h2>

            {[
              {
                date: "15 Jul 2026",
                diagnosis: "Viral Fever",
                doctor: "Dr. Sharma",
                medicine: "Paracetamol 650mg",
                status: "Recovered",
              },

              {
                date: "28 Jun 2026",
                diagnosis: "Migraine",
                doctor: "Dr. Sharma",
                medicine: "Sumatriptan",
                status: "Stable",
              },

              {
                date: "10 May 2026",
                diagnosis: "Hypertension",
                doctor: "Dr. Sharma",
                medicine: "Amlodipine",
                status: "Under Medication",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 hover:shadow-md transition bg-slate-50"
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{item.diagnosis}</h3>

                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-gray-500 text-sm">Doctor</p>

                    <p className="font-semibold">{item.doctor}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Medicine</p>

                    <p className="font-semibold">{item.medicine}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Status</p>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* //test-reports */}

        {activeTab === "reports" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">Test Reports</h2>

              <input
                type="text"
                placeholder="Search Report..."
                className="border rounded-lg px-4 py-2 w-72"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Report</th>

                    <th className="p-4 text-left">Category</th>

                    <th className="p-4 text-left">Date</th>

                    <th className="p-4 text-left">Status</th>

                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{report.name}</td>

                      <td className="p-4">{report.category}</td>

                      <td className="p-4">{report.date}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            report.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedReport && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl w-[700px] p-8 relative">
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="absolute right-5 top-5 text-gray-500 hover:text-red-600"
                  >
                    <FiX size={24} />
                  </button>

                  <h2 className="text-2xl font-bold text-teal-700 mb-6">
                    {selectedReport.name}
                  </h2>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-gray-500">Patient</p>
                      <h3 className="font-semibold">{patient.name}</h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Patient ID</p>
                      <h3 className="font-semibold">{patient.id}</h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Department</p>
                      <h3 className="font-semibold">
                        {selectedReport.category}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Date</p>
                      <h3 className="font-semibold">{selectedReport.date}</h3>
                    </div>
                  </div>

                  <hr className="my-6" />

                  <h3 className="font-bold text-lg mb-4">Report Result</h3>

                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Hemoglobin</td>
                        <td>13.8 g/dL</td>
                      </tr>

                      <tr className="border-b">
                        <td className="py-3">WBC</td>
                        <td>7,800 /µL</td>
                      </tr>

                      <tr className="border-b">
                        <td className="py-3">Platelets</td>
                        <td>2.8 Lakh /µL</td>
                      </tr>

                      <tr>
                        <td className="py-3">RBC</td>
                        <td>4.9 Million /µL</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end gap-4 mt-8">
                    <button className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      Download PDF
                    </button>

                    <button
                      onClick={() => setSelectedReport(null)}
                      className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prescription */}
        {activeTab === "prescription" && <DocPrescription />}

        {activeTab === "appointments" && (
  <PatientAppointments patientId={patient.id} />
)}
      </div>
    </div>
  );
}
