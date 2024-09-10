import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendResetLink = async (email: string) => {
    setLoading(true);
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post("/api/forget-password", {
        email: lowercaseEmail,
      });
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetLink(email);
    router.push("/signin");
  };

  return {
    loading,
    email,
    setEmail,
    handleSubmit,
    router,
  };
};

export default useForgetPassword;
