import axiosInstance from "../api/axios";

// Get All Hospitals
export const getHospitals = async () => {
  const response = await axiosInstance.get("/Hospital");
  return response.data;
};

// Get Hospital by Id
export const getHospitalById = async (id) => {
  const response = await axiosInstance.get(`/Hospital/${id}`);
  return response.data;
};

// Create Hospital
export const createHospital = async (data) => {
  const response = await axiosInstance.post("/Hospital", data);
  return response.data;
};

// Update Hospital
export const updateHospital = async (id, data) => {
  const response = await axiosInstance.put(`/Hospital/${id}`, data);
  return response.data;
};

// Delete Hospital
export const deleteHospital = async (id) => {
  const response = await axiosInstance.delete(`/Hospital/${id}`);
  return response.data;
};