'use client';

import React from 'react';
import Navbar from '../../(component)/navbar/Navbar';
import Link from 'next/link';
import GoogleBtn from '../../(component)/googleBtn/GoogleBtn';
import InputField from '../../(component)/inputField/InputField';
import Label from '../../(component)/lableInput/Label';
import useSignUpForm from './useSignUpForm';
import { color } from '../../../constants/color';

export default function SignUpPage() {
    const { inputFields, loading, register } = useSignUpForm();

    return (
        <>
            <main className={`bg-custom-radical bg-dotted-size ${color.bgColor}`}>
                <div className="bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6">
                    <Navbar />
                </div>
                <div className="items-center justify-center min-h-screen">
                    <div className="px-4">
                        <form onSubmit={register} className="max-w-[330px] mx-auto space-y-4 md:space-y-4">
                            {inputFields.map((field) => (
                                <div key={field.id} className="">
                                    <Label htmlFor={field.id} text={field.label} />
                                    <InputField
                                        className={`w-full py-1 px-4 bg-transparent placeholder-plex-mono focus:outline-none ${color.textInput} border-4 ${color.inputBorder} rounded-[30px] `}
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={loading}
                                    />
                                </div>
                            ))}
                            <div>
                                <GoogleBtn />
                            </div>
                            <div className="mt-2">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`w-full font-plex-mono ${color.forgetPassbg} ${color.forgetPassText} p-2 rounded-[30px] flex items-center justify-center`}
                                >
                                    {loading ? 'Loading...' : 'Sign up'}
                                </button>
                                <label
                                    htmlFor="account"
                                    className={`block font-medium px-3 font-plex-mono text-[18px] mb-2 mt-2 ${color.textInput}`}
                                >
                                    Already have an account?{' '}
                                    <Link href={"/signin"} className={`${color.signupText}`}>
                                        Log In
                                    </Link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
