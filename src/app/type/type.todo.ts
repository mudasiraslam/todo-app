import { ReactNode } from "react";
import { AxiosInstance } from "axios";
import { toast as toastLib } from "react-hot-toast";

export interface HandleResetPasswordParams {
  resetToken: string;
  axios: AxiosInstance;
  toast: typeof toastLib;
  router: any;
}

export interface inputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

export interface formProps {
  children: ReactNode;
  action: (formDate: FormData) => void;
  className?: string;
  onSubmit?: () => void;
}

export interface buttonProps {
  type?: "button" | "submit" | "reset";
  text: string | ReactNode;
  onClick?: () => void;
  actionButton?: boolean;
  className?: string;
  bgColor?: string;
}

export interface todo {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface Theme {
  name: string;
  value: string;
  primary: string;
  background: string;
  accent: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

export interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface LabelProps {
  htmlFor: string;
  text: string;
  className?: string;
}
export interface Task {
  id: string;
  title: string;
  listId: string;
}

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Todo {
  id: string;
  title: string;
  theme: string;
}
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type ApiResponse = {
  message: string;
  success: boolean;
};

export type Token = {
  token: string;
};

export interface TaskInput {
  title: string;
  listId: string;
}

export interface Task {
  listId: string;
}

export interface UserData {
  email: string;
  name?: string;
  imageBuffer?: string;
}
export interface MailerParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
  token: string;
}
