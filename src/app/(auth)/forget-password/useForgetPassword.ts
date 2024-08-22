import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendResetLink = async (email: string) => {
    setLoading(true);
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post("/api/forgetPassword", {
        email: lowercaseEmail,
      });
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendResetLink, loading, router };
};

export default useForgetPassword;
