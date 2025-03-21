import { IAuthCredentials } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegister() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: IAuthCredentials) => {
      return axios.post(`${API_URL}/register`, data);
    },
    onSuccess: () => {
      toast.success("Register Success", {
        description: "Please login to continue",
      });
      router.push("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error("Error", {
          description: error?.response?.data?.error ?? "Something went wrong",
        });
      } else {
        toast.error("Error", {
          description: "Something went wrong",
        });
      }
    },
  });

  const handleRegister = (data: IAuthCredentials) => {
    mutation.mutate(data);
  };

  return {
    handleRegister,
    isLoading: mutation.isPending,
  };
}

export function useLogin() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: IAuthCredentials) => {
      return axios.post("/api/login", data);
    },
    onSuccess: (data) => {
      if (data.data.token) {
        router.replace("/admin");
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error("Error", {
          description: error?.response?.data?.error ?? "Something went wrong",
        });
      } else {
        toast.error("Error", {
          description: "Something went wrong",
        });
      }
    },
  });

  const handleLogin = (data: IAuthCredentials) => {
    mutation.mutate(data);
  };

  return {
    handleLogin,
    isProcessing: mutation.isPending,
  };
}

export function useLogout() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.get("/api/logout");
    },
    onSuccess: (data) => {
      if (data.data.success) {
        router.replace("/login");
      }
    },
  });

  return {
    handleLogout: () => mutation.mutate(),
  };
}
