import { SignUpFormFields } from "../type/type";
import { SignInFormFields } from "../type/type";
import { InputFieldProps } from "../type/type";
import { ChangeEvent } from "react";
export const getInputFields = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: SignUpFormFields) => [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Name",
    value: name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value),
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    value: email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
    value: confirmPassword,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setConfirmPassword(e.target.value),
  },
];

export const getSignInFields = ({
  email,
  setEmail,
  password,
  setPassword,
}: SignInFormFields) => [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    value: email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
  },
];

// type InputFieldProps = {
//     id: string;
//     label: string;
//     type: string;
//     placeholder: string;
//     value: string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     disabled?: boolean;
// };

export const resetPasswordFields: InputFieldProps[] = [
  {
    id: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
    value: "", // will be overridden in component
    onChange: () => {}, // will be overridden in component
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your new password",
    value: "", // will be overridden in component
    onChange: () => {}, // will be overridden in component
  },
];
