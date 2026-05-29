import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://backend-marketplace-344609541672.asia-southeast2.run.app/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — inject JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem("auth-store");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore parse errors
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401/403/500
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Terjadi kesalahan server.";

    if (status === 401) {
      toast.error("Sesi habis. Silakan login kembali.");
      localStorage.removeItem("auth-store");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("Anda tidak memiliki akses.");
    } else if (status >= 500) {
      toast.error("Server error. Coba lagi nanti.");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Periksa koneksi internet Anda.");
    } else if (!error.response) {
      toast.error("Tidak dapat terhubung ke server.");
    } else {
      // Let the caller handle other errors (400, 422, etc.)
      return Promise.reject({ ...error, message });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;