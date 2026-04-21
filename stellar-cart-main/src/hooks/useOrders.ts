import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Order {
  id: number;
  totalAmount: number;
  orderStatus: string;
  trackingNumber: string;
  createdAt: string;
  estimatedDeliveryDate: string;
}

export const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get<Order[]>("/orders/my-orders");
      return data;
    },
  });

  const placeOrder = useMutation({
    mutationFn: async (orderData: { addressId: number; totalAmount: number }) => {
      const { data } = await api.post("/orders/place", orderData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order placed successfully! 📦");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place order");
    },
  });

  return { orders, placeOrder };
};

export const useTrackOrder = (trackingNumber: string) => {
  return useQuery({
    queryKey: ["track", trackingNumber],
    queryFn: async () => {
      const { data } = await api.get<Order>(`/orders/track/${trackingNumber}`);
      return data;
    },
    enabled: !!trackingNumber,
  });
};
