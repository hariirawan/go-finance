import { accounts } from "@/contants/accounts";
import { IAuthCredentials } from "@/types/auth";
import { IUser } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useProfile = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
