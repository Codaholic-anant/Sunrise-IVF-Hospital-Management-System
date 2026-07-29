import { useState } from "react";
import { State, City } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiHeart,
  FiLock,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUsers,
} from "react-icons/fi";
import EmergencyButton from "../components/EmergencyCalling";
import Navbar from "../components/Navbar";

export default function PatientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    bloodGroup: "",
    emergencyContact: "",
    password: "",
    confirmPassword: "",
  });

  const states = State.getStatesOfCountry("IN");
  const cities = form.state
  ? City.getCitiesOfState("IN", form.state)
  : [];  
    
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "state") {
    setForm((prev) => ({
      ...prev,
      state: value,
      city: "", // Clear city when state changes
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
  

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  console.log(form);

  // TODO: API Call
};

return (
  <>
    <Navbar role="Patient Registration" />

    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-cyan-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl p-10"
        >
          <h1 className="text-4xl font-bold text-center text-teal-700">
            Patient Registration
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-10">
            Please fill in the details below to create your account.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ================= PERSONAL INFORMATION ================= */}

            <div className="md:col-span-2">
              <h2 className="flex items-center gap-2 text-xl font-bold text-teal-700 border-b border-teal-200 pb-2">
                <FiUser />
                Personal Information
              </h2>
            </div>

            {/* First Name */}

            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 font-semibold text-slate-700"
              >
                First Name
              </label>

              <input
                required
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Last Name */}

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 font-semibold text-slate-700"
              >
                Last Name
              </label>

              <input
                required
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* DOB */}

            <div>
              <label
                htmlFor="dob"
                className="block mb-2 font-semibold text-slate-700"
              >
                Date of Birth
              </label>

              <input
                required
                id="dob"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Gender */}

            <div>
              <label
                htmlFor="gender"
                className="block mb-2 font-semibold text-slate-700"
              >
                Gender
              </label>

              <select
                required
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* ================= CONTACT INFORMATION ================= */}

            <div className="md:col-span-2 mt-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-teal-700 border-b border-teal-200 pb-2">
                <FiPhone />
                Contact Information
              </h2>
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                required
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Phone */}

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 font-semibold text-slate-700"
              >
                Phone Number
              </label>

              <input
                required
                id="phone"
                name="phone"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Address */}

            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 font-semibold text-slate-700"
              >
                Address
              </label>

              <input
                required
                id="address"
                name="address"
                placeholder="Enter your complete address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            


            {/* State */}

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                State
              </label>

              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select State</option>

                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            {/* City */}
            
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                City
              </label>

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Pincode */}

            <div>
              <label
                htmlFor="pincode"
                className="block mb-2 font-semibold text-slate-700"
              >
                Pincode
              </label>

              <input
                id="pincode"
                name="pincode"
                placeholder="Enter pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* ================= MEDICAL INFORMATION ================= */}

            <div className="md:col-span-2 mt-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-teal-700 border-b border-teal-200 pb-2">
                <FiHeart />
                Medical Information
              </h2>
            </div>

            {/* Blood Group */}

            <div>
              <label
                htmlFor="bloodGroup"
                className="block mb-2 font-semibold text-slate-700"
              >
                Blood Group
              </label>

              <select
                id="bloodGroup"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Emergency Contact */}

            <div>
              <label
                htmlFor="emergencyContact"
                className="block mb-2 font-semibold text-slate-700"
              >
                Emergency Contact
              </label>

              <input
                // required
                id="emergencyContact"
                name="emergencyContact"
                placeholder="+91 9876543210"
                value={form.emergencyContact}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* ================= ACCOUNT SECURITY ================= */}

            <div className="md:col-span-2 mt-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-teal-700 border-b border-teal-200 pb-2">
                <FiLock />
                Account Security
              </h2>
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <input
                required
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          {/* ================= TERMS ================= */}

          <div className="mt-8 flex items-start gap-3">
            <input type="checkbox" required className="mt-1 accent-teal-600" />

            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="font-semibold text-teal-600">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="font-semibold text-teal-600">
                Privacy Policy
              </span>
              .
            </p>
          </div>

          {/* ================= REGISTER BUTTON ================= */}

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-4 text-white text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Register
          </button>

          {/* ================= LOGIN ================= */}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?
              <Link
                to="/"
                className="ml-2 font-semibold text-teal-600 hover:text-teal-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>

    <EmergencyButton />
  </>
);
}