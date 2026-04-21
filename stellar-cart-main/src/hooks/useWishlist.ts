import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "./useProducts";
import { toast } from "sonner";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await api.get<Product[]>("/wishlist");
      return data;
    },
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: number) => {
      await api.post(`/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Added to wishlist ❤️");
    },
    onError: (error: any) => {
      toast.error(error.response?.data || "Failed to add to wishlist");
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: number) => {
      await api.delete(`/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
  });

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist: (productId: number) => wishlist.some((p) => p.id === productId),
  };
};
