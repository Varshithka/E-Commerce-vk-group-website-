import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
}

export interface PageResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export const useProducts = (search?: string, categoryId?: number, page = 0, size = 12) => {
  return useQuery({
    queryKey: ["products", search, categoryId, page, size],
    queryFn: async () => {
      const params: any = { page, size };
      if (search) params.search = search;
      if (categoryId) params.categoryId = categoryId;
      
      const { data } = await api.get<PageResponse<Product>>("/products", { params });
      return data;
    },
  });
};

export const useProduct = (id: string | number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
