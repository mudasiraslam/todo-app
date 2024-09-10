'use client';

import React from "react";
import BackIcon from "../../../public/assets/icons/backIcon";
import Label from "../(component)/lableInput/Label";
import InputField from "../(component)/inputField/InputField";
import useTheme from "../../constants/themes/useThemes";
import useChangePassword from "./useChangePassword";
import { color } from '../../constants/color'
import { resetPasswordFields } from "../../constants/inputFields";

const ChangePassword: React.FC = () => {
    const { currentTheme } = useTheme();
    const { newPassword, setNewPassword, confirmPassword, setConfirmPassword, loading, handleChangePassword, router } = useChangePassword();

    const updatedResetPasswordFields = resetPasswordFields.map(field => ({
        ...field,
        value: field.id === "newPassword" ? newPassword : confirmPassword,
        onChange: field.id === "newPassword" ? (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value) : (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
    }));

    return (
        <main className={`bg-custom-radical bg-dotted-size ${currentTheme?.bgClass || color.defaultVibrantBg}`}>
            <div className={`flex justify-between px-[24px] ${currentTheme?.textClass || color.defaultVibrantText} bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6`}>
                <div className={`flex justify-center ${currentTheme?.textClass || color.defaultVibrantText}`}>
                    <button onClick={() => router.back()} className='text-xl md:text-5xl'>
                        <BackIcon />
                    </button>
                </div>
            </div>
            <div className='min-h-screen'>
                <div className="px-4">
                    <div className="max-w-[330px] mx-auto space-y-4 md:space-y-4 py-12">
                        {updatedResetPasswordFields.map(({ id, label, type, placeholder, value, onChange }) => (
                            <div key={id}>
                                {label && <Label htmlFor={id} text={label} />}
                                <InputField
                                    id={id}
                                    type={type}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={onChange}
                                    className={`w-full placeholder-plex-mono bg-transparent border-4 focus:outline-none px-5 py-2 rounded-[30px] ${currentTheme?.textClass || color.defaultVibrantText} ${currentTheme?.borderClass || color.defaultVibrantBorder}`}
                                    disabled={loading}
                                />
                            </div>
                        ))}
                        <div className='py-3'>
                            <button
                                onClick={handleChangePassword}
                                disabled={loading}
                                className={`rounded-full px-5 py-2 bg-transparent border-4 w-full font-medium mb-3 ${currentTheme?.borderClass || color.defaultVibrantBorder} ${currentTheme?.textClass || color.defaultVibrantText}`}
                            >
                                {loading ? 'Changing Password...' : 'Change Password'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChangePassword;
