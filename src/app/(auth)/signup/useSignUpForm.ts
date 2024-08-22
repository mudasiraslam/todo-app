import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/register", {
        email: email.toLowerCase(),
        password,
        name,
      });

      if (response.data.message === "Verification email sent") {
        toast.success("Verification email sent. Please check your inbox.");
        router.push("/signin");
      } else {
        toast.error("Error during registration");
      }
    } catch (error: any) {
      if (error.response?.data === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error("Error during registration");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail: (value: string) => setEmail(value.toLowerCase()), // Automatically convert to lowercase
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    loading,
    register,
  };
};

export default useSignUpForm;
