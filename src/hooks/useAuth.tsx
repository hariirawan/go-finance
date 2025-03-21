import { IAuthCredentials } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useRegister() {
  const mutation = useMutation({
    mutationFn: (data: IAuthCredentials) => {
      return axios.post("https://reqres.in/api/register", data);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error?.response?.data?.error ?? "Something went wrong",
      });
    },
  });

  const handleRegister = (data: any) => {
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
    onError: (error: any) => {
      toast.error("Error", {
        description: error?.response?.data?.error ?? "Something went wrong",
      });
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
