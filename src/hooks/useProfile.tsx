import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfile = () => {
  const { data, isLoading } = useQuery<{ data: IUser }>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axios.get(`/api/me`);
      return response.data;
    },
  });
  return {
    data: data,
    isLoading,
  };
};
