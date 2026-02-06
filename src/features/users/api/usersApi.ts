import { axiosInstance } from "@/shared/api/axiosInstance";
import type { User } from "@/entities/user/types";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  q?: string;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

// ✅ Netlify/Hook kutayotgan named exports
export const getUsersApi = async (
  params: GetUsersParams = {},
): Promise<GetUsersResponse> => {
  const { page = 1, limit = 10, q = "" } = params;

  const { data } = await axiosInstance.get<User[]>("/users");

  let filteredData = data;

  if (q) {
    const searchLower = q.toLowerCase();
    filteredData = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower),
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filteredData.slice(start, end);

  return {
    data: paginatedData,
    total: filteredData.length,
    page,
    limit,
  };
};

export const getUserByIdApi = async (id: number): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};

// JSONPlaceholder’da PUT ishlaydi (fake update). Shuni qo‘shamiz.
export const updateUserApi = async (
  id: number,
  payload: Partial<User>,
): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`/users/${id}`, payload);
  return data;
};

// (ixtiyoriy) eski obyektni ham qoldiramiz — agar boshqa joyda ishlatilsa
export const usersApi = {
  getUsers: getUsersApi,
  getUserById: getUserByIdApi,
  updateUser: updateUserApi,
};
