import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { State, City } from "country-state-city";
import {
  createHospital,
  updateHospital,
} from "../../../services/hospitalService";

const emptyHospital = {
  HospitalCode: "",
  HospitalName: "",
  RegistrationNumber: "",
  HospitalType: "",
  EstablishedYear: "",
  TotalBeds: "",
  EmergencyAvailable: false,
  ICUAvailable: false,
  AmbulanceAvailable: false,
  BloodBankAvailable: false,
  LogoUrl: "",
  Description: "",
  Phone: "",
  Email: "",
  Website: "",
  Address: "",
  City: "",
  State: "",
  Country: "",
  Pincode: "",
  Status: 1,
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

  if (!open) return null;

  const states = State.getStatesOfCountry("IN");
  const cities = formData.State
    ? City.getCitiesOfState("IN", formData.State)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "State") {
      setFormData((prev) => ({
        ...prev,
        State: value,
        City: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = {};

    if (!formData.HospitalCode)
      validation.HospitalCode = "Hospital Code Required";

    if (!formData.HospitalName)
      validation.HospitalName = "Hospital Name Required";

    if (!formData.RegistrationNumber)
      validation.RegistrationNumber = "Registration Number Required";

    setErrors(validation);

    // Stop if validation fails
    if (Object.keys(validation).length > 0) return;

    try {
      const payload = {
        HospitalCode: formData.HospitalCode || "",
        HospitalName: formData.HospitalName || "",
        RegistrationNumber: formData.RegistrationNumber || "",
        HospitalType: formData.HospitalType || "",
        EstablishedYear: formData.EstablishedYear ? Number(formData.EstablishedYear) : null,
        TotalBeds: formData.TotalBeds ? Number(formData.TotalBeds) : null,
        EmergencyAvailable: Boolean(formData.EmergencyAvailable),
        ICUAvailable: Boolean(formData.ICUAvailable),
        AmbulanceAvailable: Boolean(formData.AmbulanceAvailable),
        BloodBankAvailable: Boolean(formData.BloodBankAvailable),
        LogoUrl: typeof formData.LogoUrl === "string" ? formData.LogoUrl : "",
        Description: formData.Description || "",
        Status: Number(formData.Status ?? 1),
        Phone: formData.Phone || "",
        Email: formData.Email || "",
        Website: formData.Website || "",
        Address: formData.Address || "",
        City: formData.City || "",
        State: formData.State || "",
        Country: formData.Country || "",
        Pincode: formData.Pincode || "",
      };

      if (hospital) {
        await updateHospital(hospital.HospitalId, payload);
      } else {
        await createHospital(payload);
      }

      onSave();
      onClose();
    } catch (err) {
    console.log(err.response);
    console.log(err.response.data);
}
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      LogoUrl: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  const toggleFacility = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
                  name="HospitalCode"
                  value={formData.HospitalCode}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="HSP001"
                />
                {errors.HospitalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.HospitalCode}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Hospital Name *
                </label>

                <input
                  name="HospitalName"
                  value={formData.HospitalName}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="ABC Multispeciality Hospital"
                />
                {errors.HospitalName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.HospitalName}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Registration Number *
                </label>

                <input
                  name="RegistrationNumber"
                  value={formData.RegistrationNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                  placeholder="REG12345"
                />
                {errors.RegistrationNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.RegistrationNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Hospital Type</label>

                <select
                  name="HospitalType"
                  value={formData.HospitalType}
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
                  name="EstablishedYear"
                  value={formData.EstablishedYear}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Total Beds</label>

                <input
                  type="number"
                  name="TotalBeds"
                  value={formData.TotalBeds}
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
                  name="Phone"
                  value={formData.Phone}
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
                  type="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="hospital@gmail.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Website</label>

                <input
                  type="url"
                  name="Website"
                  value={formData.Website}
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
                    name="Address"
                    value={formData.Address}
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
                    name="State"
                    value={formData.State}
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
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="">Select City</option>

                    {cities.map((City) => (
                      <option key={City.name} value={City.name}>
                        {City.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Country</label>

                  <input
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Pincode</label>

                  <input
                    name="Pincode"
                    value={formData.Pincode}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* CapaCity */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-slate-700 mb-6">
                Hospital CapaCity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Total Beds</label>

                  <input
                    type="number"
                    name="TotalBeds"
                    value={formData.TotalBeds}
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
                  ["Emergency", "EmergencyAvailable"],
                  ["ICU", "ICUAvailable"],
                  ["Ambulance", "AmbulanceAvailable"],
                  ["Blood Bank", "BloodBankAvailable"],
                  ["Pharmacy", "PharmacyAvailable"],
                  ["Laboratory", "LaboratoryAvailable"],
                  ["Radiology", "RadiologyAvailable"],
                  ["Parking", "ParkingAvailable"],
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
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Write hospital Description..."
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
