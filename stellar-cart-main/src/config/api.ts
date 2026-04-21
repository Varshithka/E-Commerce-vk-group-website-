/**
 * Centralized API configuration for VK Group Company E-Commerce
 */
export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/signin`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
  },
  ORDERS: {
    PLACE: `${API_BASE_URL}/orders/place`,
    TRACK: (id: string) => `${API_BASE_URL}/orders/track/${id}`,
    USER_ORDERS: (userId: number) => `${API_BASE_URL}/orders/user/${userId}`,
  },
  ADDRESSES: {
    USER_ADDRESSES: (userId: number) => `${API_BASE_URL}/addresses/user/${userId}`,
    DELETE: (id: number) => `${API_BASE_URL}/addresses/${id}`,
  }
};
