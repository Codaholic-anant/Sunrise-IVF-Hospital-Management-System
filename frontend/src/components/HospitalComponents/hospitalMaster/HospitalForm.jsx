import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { State, City } from "country-state-city";
import {
  createHospital,
  updateHospital,
} from "../../../services/hospitalService";

const emptyHospital = {
  hospitalCode: "",
  hospitalName: "",
  registrationNumber: "",
  hospitalType: "",
  establishedYear: "",
  totalBeds: "",
  emergencyAvailable: false,
  icuAvailable: false,
  ambulanceAvailable: false,
  bloodBankAvailable: false,
  logoUrl: "",
  description: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  status: "Active",
};

export default function HospitalForm({ open, onClose, hospital, onSave }) {
  const [formData, setFormData] = useState(emptyHospital);
  const [logoPreview, setLogoPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hospital) {
      setFormData(hospital);
    } else {
      setFormData(emptyHospital);
    }
  }, [hospital]);

  const states = State.getStatesOfCountry("IN");
  const cities = formData.state ? City.getCitiesOfState("IN", form.state) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "", // Clear city when state changes
      }));
    } else
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = {};

    if (!formData.hospitalCode)
      validation.hospitalCode = "Hospital Code Required";

    if (!formData.hospitalName)
      validation.hospitalName = "Hospital Name Required";

    if (!formData.registrationNumber)
      validation.registrationNumber = "Registration Number Required";

    setErrors(validation);

    // Stop if validation fails
    if (Object.keys(validation).length > 0) return;

    try {
      if (hospital) {
        await updateHospital(hospital.id, formData);
      } else {
        await createHospital(formData);
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {hospital ? "Edit Hospital" : "Add Hospital"}
            </h2>

            <p className="text-slate-500 mt-1">
              Fill hospital information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h3 className="text-lg font-semibold mb-6 text-slate-700">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Hospital Code *
                </label>

                <input
                  name="hospitalCode"
                  value={formData.hospitalCode}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="HSP001"
                />
                {errors.hospitalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hospitalCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Hospital Name *
                </label>

                <input
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="ABC Multispeciality Hospital"
                />
                {errors.hospitalName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hospitalName}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Registration Number *
                </label>

                <input
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="REG12345"
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Hospital Type</label>

                <select
                  name="hospitalType"
                  value={formData.hospitalType}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Type</option>
                  <option>General</option>
                  <option>Multi Speciality</option>
                  <option>Super Speciality</option>
                  <option>Clinic</option>
                  <option>Medical College</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Established Year
                </label>

                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Total Beds</label>

                <input
                  type="number"
                  name="totalBeds"
                  value={formData.totalBeds}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-6 text-slate-700">
                Contact Information
              </h3>
            </div>

            {/* Contact Information */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Emergency Number
                </label>

                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hospital@gmail.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Website</label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://hospital.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
            {/* Address */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-6 text-slate-700">
                Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Full Address</label>

                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* State */}

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    State
                  </label>

                  <select
                    name="state"
                    value={formData.state}
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
                    value={formData.city}
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

                <div>
                  <label className="block mb-2 font-medium">Country</label>

                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Pincode</label>

                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-slate-700 mb-6">
                Hospital Capacity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Total Beds</label>

                  <input
                    type="number"
                    name="totalBeds"
                    value={formData.totalBeds}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">ICU Beds</label>

                  <input
                    type="number"
                    name="icuBeds"
                    value={formData.icuBeds || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Operation Theatres
                  </label>

                  <input
                    type="number"
                    name="operationTheatres"
                    value={formData.operationTheatres || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Consultation Rooms
                  </label>

                  <input
                    type="number"
                    name="consultationRooms"
                    value={formData.consultationRooms || ""}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-slate-700 mb-6">
                Facilities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  ["Emergency", "emergencyAvailable"],
                  ["ICU", "icuAvailable"],
                  ["Ambulance", "ambulanceAvailable"],
                  ["Blood Bank", "bloodBankAvailable"],
                  ["Pharmacy", "pharmacyAvailable"],
                  ["Laboratory", "laboratoryAvailable"],
                  ["Radiology", "radiologyAvailable"],
                  ["Parking", "parkingAvailable"],
                ].map(([label, field]) => (
                  <div
                    key={field}
                    className="flex items-center justify-between border rounded-xl p-4 bg-slate-50"
                  >
                    <span className="font-medium">{label}</span>

                    <button
                      type="button"
                      onClick={() => toggleFacility(field)}
                      className={`w-12 h-6 rounded-full transition relative ${
                        formData[field] ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                          formData[field] ? "left-6" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Upload */}

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-5">Hospital Logo</h3>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-40 h-40 rounded-xl border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50 flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Logo</span>
                  )}
                </div>

                <div>
                  <input type="file" accept="image/*" onChange={handleLogo} />

                  <p className="text-sm text-gray-500 mt-2">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Description
              </h3>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write hospital description..."
                className="w-full border rounded-xl p-4 resize-none"
              />
            </div>
          </div>

          <div className="border-t px-8 py-5 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition"
            >
              Save Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
