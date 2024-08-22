
'use client';

import React from 'react';
import Navbar from '../../(component)/navbar/Navbar';
import Link from 'next/link';
import GoogleBtn from '../../(component)/googleBtn/GoogleBtn';
import InputField from '../../(component)/inputField/InputField';
import Label from '../../(component)/lableInput/Label';
import useSignUpForm from './useSignUpForm';
import { color } from '../../constants/color';

export default function SignUpPage() {
    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        name, setName,
        loading, register
    } = useSignUpForm();

    return (
        <>
            <main className={`bg-custom-radical bg-dotted-size ${color.bgColor}`}>
                <div>
                    <div className='bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6'>
                        <Navbar />
                    </div>
                    <div className="items-center justify-center min-h-screen">
                        <div className=''>
                            <div className='px-4'>
                                <form onSubmit={register} className='max-w-[330px] mx-auto space-y-4 md:space-y-4'>
                                    <div className="">
                                        <Label htmlFor="name" text="Name" />
                                        <InputField
                                            className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="">
                                        <Label htmlFor="email" text="Email" />
                                        <InputField
                                            className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                            id="email"
                                            type="email"
                                            placeholder="Email"
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
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="">
                                        <Label htmlFor="confirmPassword" text="Confirm Password" />
                                        <InputField
                                            className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono ${color.textInput} focus:outline-none  border-4 ${color.inputBorder} rounded-[30px] `}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <GoogleBtn />
                                    </div>

                                    <div className="mt-2">
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full font-plex-mono bg-orange-500 text-[#232020] p-2 rounded-[30px] flex items-center justify-center"
                                        >
                                            {loading ? 'Loading...' : 'Sign up'}
                                        </button>
                                        <label htmlFor="account" className="block font-medium px-3 font-plex-mono text-[18px] mb-2 mt-2 text-[#F4F4F4]">
                                            Already have an account? <Link href={"/signin"} className="text-customOrange">Log In</Link>
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
