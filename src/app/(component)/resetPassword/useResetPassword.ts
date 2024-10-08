import { HandleResetPasswordParams } from "@/type/type";
import { useState } from "react";

export const useResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async ({
    resetToken,
    axios,
    toast,
    router,
  }: HandleResetPasswordParams) => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/reset-password", {
        newPassword,
        resetToken,
      });

      if (response.status === 200) {
        toast.success("Password reset successfully");
        router.push("/signin");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    confirmPassword,
    loading,
    handleChangeNewPassword,
    handleChangeConfirmPassword,
    handleResetPassword,
  };
};
