import { useEffect,useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import HospitalStats from "../../components/HospitalComponents/hospitalMaster/HospitalStats";
import HospitalTable from "../../components/HospitalComponents/hospitalMaster/HospitalTable";
import HospitalForm from "../../components/HospitalComponents/hospitalMaster/HospitalForm";
import {
  getHospitals,
  deleteHospital,
} from "../../services/hospitalService";

export default function HospitalMaster() {
  // Dummy Data (Later this will come from API)
  const [hospitals, setHospitals] = useState([]);
  const handleSaved = () => {
    loadHospitals();
  };
  const [showForm, setShowForm] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Search & Filters

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter Logic

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchSearch =
        hospital.name.toLowerCase().includes(search.toLowerCase()) ||
        hospital.code.toLowerCase().includes(search.toLowerCase()) ||
        hospital.phone.includes(search);

      const matchType = !typeFilter || hospital.type === typeFilter;

      const matchStatus = !statusFilter || hospital.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [hospitals, search, typeFilter, statusFilter]);

  const loadHospitals = async () => {
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);
  // Button Actions

  const handleDelete = async (id) => {
    if (window.confirm("Delete this hospital?")) {
      await deleteHospital(id);

      loadHospitals();
    }
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);

    setShowForm(true);
  };
  const handleAdd = () => {
    setSelectedHospital(null);
    setShowForm(true);
  };


  const handleView = (hospital) => {
    console.log("View", hospital);
  };



  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hospital Master</h1>

          <p className="text-slate-500 mt-2">
            Manage hospitals across the organization.
          </p>
        </div>

        {/* <button
          onClick={handleAdd}
          className="mt-4 lg:mt-0 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl shadow"
        >
          <FiPlus />
          Add Hospital
        </button> */}
      </div>

      {/* Statistics */}

      <HospitalStats />

      {/* Table */}

      <div className="mt-8">
        <HospitalTable
          hospitals={filteredHospitals}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <HospitalForm
        open={showForm}
        onClose={() => setShowForm(false)}
        hospital={selectedHospital}
        onSave={handleSaved}
      />
    </div>
  );
}
