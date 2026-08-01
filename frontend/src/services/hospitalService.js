import axiosInstance from "../api/axios";

const normalizeHospital = (hospital) => {
  if (!hospital || typeof hospital !== "object") return hospital;

  return {
    HospitalId: hospital.hospitalId ?? hospital.HospitalId ?? hospital.id ?? hospital.Id ?? null,
    HospitalCode: hospital.hospitalCode ?? hospital.HospitalCode ?? "",
    HospitalName: hospital.hospitalName ?? hospital.HospitalName ?? "",
    RegistrationNumber: hospital.registrationNumber ?? hospital.RegistrationNumber ?? "",
    HospitalType: hospital.hospitalType ?? hospital.HospitalType ?? "",
    EstablishedYear: hospital.establishedYear ?? hospital.EstablishedYear ?? null,
    TotalBeds: hospital.totalBeds ?? hospital.TotalBeds ?? null,
    EmergencyAvailable: hospital.emergencyAvailable ?? hospital.EmergencyAvailable ?? false,
    ICUAvailable: hospital.iCUAvailable ?? hospital.ICUAvailable ?? false,
    AmbulanceAvailable: hospital.ambulanceAvailable ?? hospital.AmbulanceAvailable ?? false,
    BloodBankAvailable: hospital.bloodBankAvailable ?? hospital.BloodBankAvailable ?? false,
    LogoUrl: hospital.logoUrl ?? hospital.LogoUrl ?? "",
    Description: hospital.description ?? hospital.Description ?? "",
    Status: hospital.status ?? hospital.Status ?? 1,
    Phone: hospital.phone ?? hospital.Phone ?? "",
    Email: hospital.email ?? hospital.Email ?? "",
    Website: hospital.website ?? hospital.Website ?? "",
    Address: hospital.address ?? hospital.Address ?? "",
    City: hospital.city ?? hospital.City ?? "",
    State: hospital.state ?? hospital.State ?? "",
    Country: hospital.country ?? hospital.Country ?? "",
    Pincode: hospital.pincode ?? hospital.Pincode ?? "",
  };
};

const normalizeHospitalResponse = (data) => {
  if (Array.isArray(data)) {
    return data.map(normalizeHospital);
  }

  if (data && typeof data === "object") {
    return normalizeHospital(data);
  }

  return data;
};

// Get All Hospitals
export const getHospitals = async () => {
  const response = await axiosInstance.get("/Hospital");
  return normalizeHospitalResponse(response.data);
};

// Get Hospital by Id
export const getHospitalById = async (id) => {
  const response = await axiosInstance.get(`/Hospital/${id}`);
  return normalizeHospitalResponse(response.data);
};

// Create Hospital
export const createHospital = async (data) => {
  const response = await axiosInstance.post("/Hospital", data);
  return normalizeHospitalResponse(response.data);
};

// Update Hospital
export const updateHospital = async (id, data) => {
  const response = await axiosInstance.put(`/Hospital/${id}`, data);
  return normalizeHospitalResponse(response.data);
};

// Delete Hospital
export const deleteHospital = async (id) => {
  const response = await axiosInstance.delete(`/Hospital/${id}`);
  return normalizeHospitalResponse(response.data);
};