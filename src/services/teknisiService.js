import axiosInstance from "../api/axios";

const teknisiService = {
  /**
   * GET /api/admin/teknisi
   * Query params: page, limit, search, status
   */
  getAll: async ({ page = 1, limit = 10, search = "", status = "" } = {}) => {
    const params = { page, limit };
    if (search) params.search = search;
    if (status) params.status = status;

    const response = await axiosInstance.get("/admin/teknisi", { params });
    return response.data;
  },

  /**
   * GET /api/admin/teknisi/:id
   */
  getById: async (id) => {
    const response = await axiosInstance.get(`/admin/teknisi/${id}`);
    return response.data;
  },

  /**
   * POST /api/admin/teknisi
   */
  create: async (data) => {
    const response = await axiosInstance.post("/admin/teknisi", data);
    return response.data;
  },

  /**
   * PUT /api/admin/teknisi/:id
   */
  update: async (id, data) => {
    const response = await axiosInstance.put(`/admin/teknisi/${id}`, data);
    return response.data;
  },

  /**
   * DELETE /api/admin/teknisi/:id
   */
  delete: async (id) => {
    const response = await axiosInstance.delete(`/admin/teknisi/${id}`);
    return response.data;
  },

  /**
   * PATCH /api/admin/teknisi/:id/status
   * Toggle status aktif/nonaktif
   */
  toggleStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/admin/teknisi/${id}/status`, { status });
    return response.data;
  },
};

export default teknisiService;