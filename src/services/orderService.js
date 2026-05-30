import axios from "../api/axios";

const orderService = {
  getAll: async () => {
    const res = await axios.get("/order/antrean");
    return res.data.data;
  },

  updateStatus: async (id, status) => {
    const res = await axios.put(`/order/${id}/status`, {
      status,
    });

    return res.data;
  },
};

export default orderService;