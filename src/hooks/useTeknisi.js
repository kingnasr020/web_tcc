import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import teknisiService from "../services/teknisiService";

export const teknisiKeys = {
  all: ["teknisi"],
};

export function useTeknisiList() {
  return useQuery({
    queryKey: teknisiKeys.all,
    queryFn: teknisiService.getAll,
  });
}

export function useDeleteTeknisi() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: teknisiService.delete,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: teknisiKeys.all,
      });

      toast.success("Teknisi berhasil dihapus");
    },

    onError: (err) => {
      toast.error(err?.message || "Gagal menghapus teknisi");
    },
  });
}