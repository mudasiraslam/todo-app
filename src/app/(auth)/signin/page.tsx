'use client'

import React, { useState } from 'react';
import Navbar from '../../(component)/navbar/Navbar';
import GoogleBtn from '../../(component)/googleBtn/GoogleBtn';
import Link from 'next/link';
import { color } from '../../constants/color';
import Label from '../../(component)/lableInput/Label';
import InputField from '../../(component)/inputField/InputField';
import useAuth from './useSigninForm';
import useTheme from './useSigninForm';



export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();
    const currentTheme = useTheme();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        login(email, password);
    };

    return (
        <>
            <main className={`bg-custom-radical bg-dotted-size ${color.bgColor}`}>
                <div>
                    <div className="">
                        <div className='bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6'>
                            <Navbar />
                        </div>
                        <div className="min-h-screen items-center justify-center">
                            <div className=" ">
                                <div className='px-4'>
                                    <form onSubmit={handleSubmit} className='max-w-[330px] mx-auto space-y-4 md:space-y-4 py-12'>
                                        <div className="">
                                            <Label htmlFor="email" text="Email" />
                                            <InputField
                                                className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="">
                                            <Label htmlFor="password" text="Password" />
                                            <InputField
                                                className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                                id="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                            />
                                            <Link href={'/forget-password'} className="block text-right font-medium font-plex-mono text-[18px] mb-2 mt-2 text-[#F4F4F4]">Forget Password</Link>
                                        </div>
                                        <div>
                                            <GoogleBtn />
                                        </div>
                                        <div>
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full bg-orange-500 text-[#232020] font-plex-mono p-2 rounded-[30px]">
                                                {loading ? 'Loading...' : 'Sign In'}
                                            </button>
                                            <label htmlFor="account" className="block font-medium px-3 font-plex-mono text-[18px] mb-2 mt-2 text-[#F4F4F4]">
                                                Do not have an account? <Link href={"/signup"} className="text-customOrange">Sign Up</Link>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
