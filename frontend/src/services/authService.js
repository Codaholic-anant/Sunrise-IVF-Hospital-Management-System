import axiosInstance from "../api/axios";

export const login = async (credentials) => {
  try {
    console.log("Credentials:", credentials);

    const response = await axiosInstance.post("/Login", {
      username: credentials.loginId,
      password: credentials.password,
    });

    console.log("Success:", response.data);

    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);

      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          userId: response.data.userId,
          username: response.data.username,
          role: "SuperAdmin",
        })
      );
    }

    return response.data;
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    throw err;
  }
};

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("currentUser");
};