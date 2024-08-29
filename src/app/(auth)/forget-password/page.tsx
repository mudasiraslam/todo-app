'use client';

import React, { useState } from 'react';
import { color } from '../../constants/color';
import BackIcon from '../../../../public/assets/icons/backIcon';
import Label from '../../(component)/lableInput/Label';
import InputField from '../../(component)/inputField/InputField';
import useForgetPassword from './useForgetPassword';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { sendResetLink, loading, router } = useForgetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetLink(email);
  };

  return (
    <main className={`bg-custom-radical bg-dotted-size ${color.bgColor}`}>
      <div>
        <div className="">
          <div className={`bg-dotted-size backdrop-blur-backdropBlur bg-blend-overlay py-6 pl-6 ${color.textInput}`}>
            <button onClick={() => router.back()} >
              <BackIcon />
            </button>
          </div>
          <div className="min-h-screen">
            <div className="">
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
                  <div className='mt-2'>
                    <button
                      disabled={loading}
                      type="submit"
                      className={`w-full ${color.forgetPassbg} ${color.forgetPassText} font-plex-mono p-2 rounded-[30px]`}>
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPasswordPage;
