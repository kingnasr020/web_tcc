import { useQuery } from "@tanstack/react-query";
import customerService from "../services/customerService";

export function useCustomerList() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
  });
}