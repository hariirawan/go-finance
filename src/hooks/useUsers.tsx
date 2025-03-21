import { IRespUser, IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUsers = (searchQuery: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<IRespUser>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<IRespUser>(
        "https://reqres.in/api/users"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const mutation = useMutation({
    mutationFn: (data: IUser) => {
      if (data.id) {
        return axios.put(`https://reqres.in/api/users/${data.id}`, data);
      } else {
        return axios.post("https://reqres.in/api/users", data);
      }
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["users"], (oldData: any) => {
        if (!oldData) return { data: [data.data] };
        return {
          data: id
            ? oldData.data.map((user: IUser) =>
                user.id === id ? { ...user, ...data.data } : user
              )
            : [...oldData.data, data.data],
        };
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { id?: number }) => {
      return axios.delete(`https://reqres.in/api/users/${data.id}`);
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["users"], (oldData: any) => {
        if (!oldData) return { data: [data.data] };
        return {
          data: oldData.data.filter((user: IUser) => user.id !== id),
        };
      });
    },
  });

  const filteredData = (data?.data ?? []).filter((user) =>
    [user.first_name, user.last_name, user.email].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return {
    data: filteredData,
    isLoading,
    isProcessing: mutation.isPending || deleteMutation.isPending,
    handleSubmit: mutation.mutate,
    handleDelete: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
