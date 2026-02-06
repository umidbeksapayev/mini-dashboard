import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersApi, getUserByIdApi, updateUserApi } from "../api/usersApi";
import type { User } from "@/entities/user/types";

interface UseUsersQueryParams {
  page?: number;
  limit?: number;
  q?: string;
}

export const useUsersQuery = (params: UseUsersQueryParams = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersApi(params),
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useUserQuery = (id: number | null) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByIdApi(id!),
    enabled: id !== null,
    staleTime: 30000,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUserApi(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", updatedUser.id], updatedUser);
    },
  });
};
