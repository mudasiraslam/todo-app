'use client';

import React, { Suspense } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import BackIcon from '../../../../public/assets/icons/backIcon';
import Label from '../lableInput/Label';
import InputField from '../inputField/InputField';
import useTheme from "../../(component)/themes/useThemes";
import { useResetPasswordForm } from './useResetPassword';
import { color } from '../../constants/color';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetToken = searchParams?.get('token') || '';
    const { currentTheme } = useTheme();
    const {
        newPassword,
        confirmPassword,
        loading,
        handleChangeNewPassword,
        handleChangeConfirmPassword,
        handleResetPassword,
    } = useResetPasswordForm();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main
                className={`${color.bgColor} bg-custom-radical bg-dotted-size `}
            >
                <div
                    className={`flex justify-between px-[24px] bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6 text-white`}
                >
                    <button
                        onClick={() => router.back()}
                        className='text-xl md:text-5xl '
                    >
                        <BackIcon />
                    </button>
                </div>
                <div className='min-h-screen'>
                    <div className='max-w-[330px] mx-auto space-y-4 md:space-y-4 py-12'>
                        <div>
                            <Label htmlFor="newPassword" text="New Password" />
                            <InputField
                                className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px]`}
                                id="newPassword"
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={handleChangeNewPassword}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword" text="Confirm Password" />
                            <InputField
                                className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px]`}
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={handleChangeConfirmPassword}
                                disabled={loading}
                            />
                        </div>
                        <div className='py-3'>
                            <button
                                onClick={() => handleResetPassword(resetToken, axios, toast, router)}
                                disabled={loading}
                                className={`rounded-full px-4 py-1 bg-transparent w-full font-medium mb-3 ${color.textInput} border-4 ${color.inputBorder}`}
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    );
};

export default ResetPassword;
