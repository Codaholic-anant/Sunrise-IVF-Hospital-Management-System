import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiPlus,
} from "react-icons/fi";

export default function HospitalTable({
  hospitals = [],
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

      {/* Header */}
      <div className="p-6 border-b border-slate-200">

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <h2 className="text-xl font-bold text-slate-800">
            Hospital List
          </h2>

          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl transition"
          >
            <FiPlus />
            Add Hospital
          </button>

        </div>

        {/* Search & Filters */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

          <div className="relative">

            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Hospital..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            />

          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4"
          >
            <option value="">All Types</option>
            <option>IVF</option>
            <option>General</option>
            <option>Clinic</option>
            <option>Multi Speciality</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4"
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            className="border rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100"
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Hospital</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {hospitals.map((hospital) => (

              <tr
                key={hospital.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4 font-semibold">
                  {hospital.code}
                </td>

                <td className="p-4">
                  {hospital.name}
                </td>

                <td className="p-4">
                  {hospital.city}
                </td>

                <td className="p-4">
                  {hospital.phone}
                </td>

                <td className="p-4">
                  {hospital.type}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      hospital.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hospital.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onView(hospital)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit(hospital)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => onDelete(hospital)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden p-4 space-y-4">

        {hospitals.map((hospital) => (

          <div
            key={hospital.id}
            className="border rounded-xl p-4 shadow-sm"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold">
                  {hospital.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {hospital.code}
                </p>

              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full
                ${
                  hospital.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {hospital.status}
              </span>

            </div>

            <div className="mt-3 text-sm space-y-1">

              <p>
                <strong>City:</strong> {hospital.city}
              </p>

              <p>
                <strong>Phone:</strong> {hospital.phone}
              </p>

              <p>
                <strong>Type:</strong> {hospital.type}
              </p>

            </div>

            <div className="flex justify-end gap-4 mt-4">

              <button onClick={() => onView(hospital)}>
                <FiEye />
              </button>

              <button onClick={() => onEdit(hospital)}>
                <FiEdit2 />
              </button>

              <button onClick={() => onDelete(hospital)}>
                <FiTrash2 />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}