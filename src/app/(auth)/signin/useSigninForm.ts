import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/");
      } else if (loginResponse?.error) {
        toast.error(loginResponse.error);
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (
    event: React.FormEvent,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    login(email, password);
  };

  return { login, loading, handleSubmit };
};

export default useAuth;
