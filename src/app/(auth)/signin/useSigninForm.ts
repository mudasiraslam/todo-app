import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const loginResponse = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (loginResponse?.ok) {
        toast.success("Correct Login");
        window.location.assign("/");
      } else if (loginResponse?.error) {
        toast.error(loginResponse.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useAuth;
