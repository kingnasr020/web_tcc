import axiosInstance from "../api/axios";

const authService = {
  /**
   * Login admin dengan email & password
   * Backend POST /api/auth/login
   * Expects: { email, password }
   * Returns: { token, user }
   */
  login: async (email, password) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
  },

  /**
   * Logout (opsional: hit endpoint backend untuk invalidate token)
   */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {
      // Tetap logout local meski endpoint gagal
    }
  },

  /**
   * Get profil admin yang sedang login
   */
  getProfile: async () => {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  },
};

export default authService;