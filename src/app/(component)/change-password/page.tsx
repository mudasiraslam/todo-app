'use client';

import React from "react";
import BackIcon from "../../../../public/assets/icons/backIcon";
import Label from "../lableInput/Label";
import InputField from "../inputField/InputField";
import useTheme from "../themes/useThemes";
import useChangePassword from "./useChangePassword";

const ChangePassword: React.FC = () => {
    const { currentTheme } = useTheme();
    const { newPassword, setNewPassword, confirmPassword, setConfirmPassword, loading, handleChangePassword, router } = useChangePassword();

    return (
        <main className={`bg-custom-radical bg-dotted-size ${currentTheme?.bgClass || 'bg-vibrantSpectrumBackground'}`}>
            <div className={`flex justify-between px-[24px]  ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6`}>
                <div className={`flex justify-center ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} `}>
                    <button onClick={() => router.back()} className='text-xl md:text-5xl'>
                        <BackIcon />
                    </button>
                </div>
            </div>
            <div className='min-h-screen'>
                <div className="px-4">
                    <div className="max-w-[330px] mx-auto space-y-4 md:space-y-4 py-12">
                        <div>
                            <Label htmlFor="newPassword" text="New Password" />
                            <InputField
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter password"
                                className={`w-full placeholder-plex-mono bg-transparent border-4 focus:outline-none hover:outline-none px-5 py-2 rounded-[30px] md:max-w-[555px] md:max-h-[113px] ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'}`}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword" text="Confirm Password" />
                            <InputField
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm password'
                                className={`w-full placeholder-plex-mono bg-transparent border-4 py-2 px-5 rounded-[30px] md:max-w-[447px] md:max-h-[113px] ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'} ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'}`}
                            />
                        </div>
                        <div className='py-3'>
                            <button
                                onClick={handleChangePassword}
                                disabled={loading}
                                className={`rounded-full px-5 py-2 bg-transparent border-4 w-full font-medium mb-3 ${currentTheme?.borderClass || 'border-vibrantSpectrumAccent'} ${currentTheme?.textClass || 'text-vibrantSpectrumPrimary'}`}
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
