import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import teknisiService from "../services/teknisiService";

// Query keys factory
export const teknisiKeys = {
  all: ["teknisi"],
  lists: () => [...teknisiKeys.all, "list"],
  list: (filters) => [...teknisiKeys.lists(), filters],
  detail: (id) => [...teknisiKeys.all, "detail", id],
};

// ─── Queries ───────────────────────────────────────────────

export function useTeknisiList({ page = 1, limit = 10, search = "", status = "" } = {}) {
  return useQuery({
    queryKey: teknisiKeys.list({ page, limit, search, status }),
    queryFn: () => teknisiService.getAll({ page, limit, search, status }),
    placeholderData: (prev) => prev, // keep previous data while fetching (no loading flicker)
    // Backend belum ada → pakai dummy data sebagai fallback
    // Hapus bagian ini setelah backend siap
  });
}

export function useTeknisiDetail(id) {
  return useQuery({
    queryKey: teknisiKeys.detail(id),
    queryFn: () => teknisiService.getById(id),
    enabled: !!id,
  });
}

// ─── Mutations ─────────────────────────────────────────────

export function useCreateTeknisi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => teknisiService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teknisiKeys.lists() });
      toast.success("Teknisi berhasil ditambahkan!");
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal menambahkan teknisi.");
    },
  });
}

export function useUpdateTeknisi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => teknisiService.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: teknisiKeys.lists() });
      qc.invalidateQueries({ queryKey: teknisiKeys.detail(id) });
      toast.success("Data teknisi berhasil diperbarui!");
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal memperbarui teknisi.");
    },
  });
}

export function useDeleteTeknisi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => teknisiService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teknisiKeys.lists() });
      toast.success("Teknisi berhasil dihapus.");
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal menghapus teknisi.");
    },
  });
}

export function useToggleTeknisiStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => teknisiService.toggleStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teknisiKeys.lists() });
      toast.success("Status teknisi diperbarui.");
    },
    onError: (err) => {
      toast.error(err?.message || "Gagal mengubah status.");
    },
  });
}