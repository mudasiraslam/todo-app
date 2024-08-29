"use client"
import { color } from '@/app/constants/color'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function logout() {
    return (
        <div className={`${color.forgetPassbg} rounded cursor-pointer p-3 text-center m-4`} onClick={() => {
            signOut()
        }}>
            Logout
        </div>
    )
}
