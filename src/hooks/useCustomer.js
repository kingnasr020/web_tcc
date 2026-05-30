import { useQuery } from "@tanstack/react-query";
import customerService from "../services/customerService";

export function useCustomerList() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
    // Tambahkan 'select' ini untuk menyaring data di frontend
    select: (data) => {
      // Ambil array datanya (menyesuaikan format respons axios)
      const users = data?.data || data || [];
      
      // Kembalikan HANYA yang role-nya "customer"
      return users.filter((user) => user.role === "customer");
    },
  });
}