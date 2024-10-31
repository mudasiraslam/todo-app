import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleImg from '../../../../public/assets/google.svg';
import Image from 'next/image';
import { color } from '@/constants/color';

function GoogleBtn() {
    const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const callbackUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000/';
        signIn('google', { callbackUrl });
    };

    return (
        <>
            <button
                className={`${color.signupText} w-full font-plex-mono mt-9 ${color.bgColor} flex items-center p-2 ${color.signupBorder} border-2 rounded-[30px]`}
                onClick={signInWithGoogle}
            >
                <Image
                    src={GoogleImg}
                    className="w-[28px] h-[28px] ml-2"
                    alt="Google logo"
                />
                <span className="ml-2">Sign Up with Google</span>
            </button>
        </>
    );
}

export default GoogleBtn;
