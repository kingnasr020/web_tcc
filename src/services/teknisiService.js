import axiosInstance from "../api/axios";
const teknisiService = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/admin/teknisi");
    return data;
  },

  getById: async (id) => {
    const { data } = await axiosInstance.get(`/admin/teknisi/${id}`);
    return data;
  },

  delete: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/teknisi/${id}`);
    return data;
  },
};

export default teknisiService;