import { signIn } from 'next-auth/react'
import React from 'react'
import GoogleImg from '../../../../public/assets/google.svg'
import Image from 'next/image'


function GoogleBtn() {
    // const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })


    // }
    return (
        <>
            <button className=' text-orange-500 w-full font-plex-mono mt-9 bg-[#232020] flex items-center p-2 border-customOrange border-2 rounded-[30px]' onClick={ }>
                <Image src={GoogleImg} className='w-[28px] h-[28px]  ml-2' alt='Google logo' />
                <span className='ml-2'>Sign Up with Google</span>
            </button>


        </>
    )
}

export default GoogleBtn

