import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCustomMutate = (key, fn) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
      toast.success("Thành công !");
    },
    onError: () => {
      toast.error("Có lỗi !");
    },
  });
  return { mutation };
};
