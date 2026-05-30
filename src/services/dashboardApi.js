import axiosInstance from "./axios";

export const getDashboardStats = async () => {
  const [orders, teknisi] = await Promise.all([
    axiosInstance.get("/order/antrean"),
    axiosInstance.get("/teknisi/admin"),
  ]);

  return {
    totalOrder: orders.data?.data?.length || 0,
    totalTeknisi: teknisi.data?.data?.length || 0,
  };
};