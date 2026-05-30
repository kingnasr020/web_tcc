import axiosInstance from "../api/axios";

const customerService = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/users");
    return data;
  },
};

export default customerService;