import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiClock,
  FiEdit,
  FiLock,
} from "react-icons/fi";

export default function DoctorProfile() {
  const doctor = {
    id: "DOC001",
    name: "Dr. Rajesh Sharma",
    designation: "IVF Specialist",

    gender: "Male",
    dob: "12 May 1985",

    phone: "+91 9876543210",
    email: "doctor@sunriseivf.com",
    address: "Bareilly, Uttar Pradesh",

    department: "IVF",
    specialization: "Reproductive Medicine",

    qualification:
      "MBBS, MD (OBG), Fellowship in Reproductive Medicine",

    experience: "12 Years",

    registration: "MCI458796",

    hospital: "Sunrise IVF Centre",
    joining: "15 Jan 2023",
    shift: "Morning",
    room: "204",

    username: "dr.rajesh",
    role: "Doctor",
    status: "Active",
    lastLogin: "Today 09:15 AM",
  };

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-teal-600 flex items-center justify-center text-white text-6xl">
            <FiUser />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800">
              {doctor.name}
            </h1>

            <p className="text-lg text-slate-500 mt-1">
              {doctor.designation}
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                Doctor ID : {doctor.id}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                {doctor.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiUser />
            Personal Information
          </h2>

          <div className="space-y-4">
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>Date of Birth:</strong> {doctor.dob}</p>

            <p className="flex items-center gap-2">
              <FiPhone />
              {doctor.phone}
            </p>

            <p className="flex items-center gap-2">
              <FiMail />
              {doctor.email}
            </p>

            <p className="flex items-center gap-2">
              <FiMapPin />
              {doctor.address}
            </p>
          </div>
        </div>

        {/* Professional */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiAward />
            Professional Information
          </h2>

          <div className="space-y-4">
            <p><strong>Department:</strong> {doctor.department}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Registration No:</strong> {doctor.registration}</p>
          </div>
        </div>

        {/* Hospital */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiBriefcase />
            Hospital Information
          </h2>

          <div className="space-y-4">
            <p><strong>Hospital:</strong> {doctor.hospital}</p>
            <p><strong>Joining Date:</strong> {doctor.joining}</p>
            <p><strong>Shift:</strong> {doctor.shift}</p>
            <p><strong>Cabin:</strong> {doctor.room}</p>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiClock />
            Account Information
          </h2>

          <div className="space-y-4">
            <p><strong>Username:</strong> {doctor.username}</p>
            <p><strong>Role:</strong> {doctor.role}</p>
            <p><strong>Status:</strong> {doctor.status}</p>
            <p><strong>Last Login:</strong> {doctor.lastLogin}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg">
          <FiEdit />
          Edit Profile
        </button>

        <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg">
          <FiLock />
          Change Password
        </button>
      </div>
    </div>
  );
}