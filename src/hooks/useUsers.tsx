import { IRespUser, IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useUsers = (searchQuery: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<IRespUser>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<IRespUser>(`${API_URL}/users`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const mutation = useMutation({
    mutationFn: (data: IUser) => {
      if (data.id) {
        return axios.put(`${API_URL}/users/${data.id}`, data);
      } else {
        return axios.post(`${API_URL}/users`, data);
      }
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["users"], (oldData: { data: IUser[] }) => {
        if (!oldData) return { data: [data.data] };
        return {
          data: id
            ? oldData.data.map((user: IUser) =>
                user.id === id ? { ...user, ...data.data } : user
              )
            : [...oldData.data, data.data],
        };
      });
      toast.success("Success", {
        description: id
          ? "Data has been successfully updated!"
          : "Data has been successfully added!",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { id?: number }) => {
      return axios.delete(`${API_URL}/users/${data.id}`);
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["users"], (oldData: { data: IUser[] }) => {
        if (!oldData) return { data: [data.data] };
        return {
          data: oldData.data.filter((user: IUser) => user.id !== id),
        };
      });
      toast.success("Deleted Success", {
        description: "Data has been successfully deleted!",
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
