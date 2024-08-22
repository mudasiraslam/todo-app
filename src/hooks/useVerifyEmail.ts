import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useVerifyEmail = () => {
  const [verifed, setVerifed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const verifyUserEmail = async () => {
    try {
      if (token) {
        await axios.post("/api/users/verifyemail", { token });
        setVerifed(true);
      } else {
        setError("No Token");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Verification failed");
    }
  };

  return {
    verifyUserEmail,
    error,
    verifed,
  };
};
