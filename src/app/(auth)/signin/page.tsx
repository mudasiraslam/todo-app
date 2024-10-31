'use client';

import React, { useState } from 'react';
import Navbar from '../../(component)/navbar/Navbar';
import GoogleBtn from '../../(component)/googleBtn/GoogleBtn';
import Link from 'next/link';
import { color } from '../../../constants/color';
import Label from '../../(component)/lableInput/Label';
import InputField from '../../(component)/inputField/InputField';
import useAuth from './useSigninForm';
import { getSignInFields } from '@/constants/inputFields';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, loading } = useAuth();

    const inputFields = getSignInFields({ email, setEmail, password, setPassword });

    return (
        <>
            <main className={`bg-custom-radical bg-dotted-size ${color.bgColor}`}>
                <div className="">
                    <div className="bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6">
                        <Navbar />
                    </div>
                    <div className="min-h-screen items-center justify-center">
                        <div className="">
                            <div className="px-4">
                                <form
                                    onSubmit={(event) => handleSubmit(event, email, password)}
                                    className="max-w-[330px] mx-auto space-y-4 md:space-y-4 py-12"
                                >
                                    {inputFields.map(({ id, label, type, placeholder, value, onChange }) => (
                                        <div key={id}>
                                            <Label htmlFor={id} text={label} />
                                            <InputField
                                                className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                                id={id}
                                                type={type}
                                                placeholder={placeholder}
                                                value={value}
                                                onChange={onChange}
                                                disabled={loading}
                                            />
                                        </div>
                                    ))}
                                    <Link
                                        href={'/forget-password'}
                                        className={`block text-right font-medium font-plex-mono text-[18px] mb-2 mt-2 ${color.textInput}`}
                                    >
                                        Forget Password
                                    </Link>
                                    <div>
                                        <GoogleBtn />
                                    </div>
                                    <div>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className={`w-full ${color.forgetPassbg} ${color.forgetPassText} font-plex-mono p-2 rounded-[30px]`}
                                        >
                                            {loading ? 'Loading...' : 'Sign In'}
                                        </button>
                                        <label
                                            htmlFor="account"
                                            className={`block font-medium px-3 font-plex-mono text-[18px] mb-2 mt-2 ${color.textInput}`}
                                        >
                                            Do not have an account?{' '}
                                            <Link href={'/signup'} className={`${color.signupText}`}>
                                                Sign Up
                                            </Link>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
