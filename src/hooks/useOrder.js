import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import orderService from "../services/orderService";

export const orderKeys = {
  all: ["orders"],
};

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: orderService.getAll,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      orderService.updateStatus(id, status),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: orderKeys.all,
      });

      toast.success("Status order berhasil diperbarui");
    },

    onError: (err) => {
      toast.error(err?.message || "Gagal update status");
    },
  });
}