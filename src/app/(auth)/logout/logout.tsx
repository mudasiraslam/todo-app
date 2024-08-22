"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

export default function logout() {
    return (
        <div className='bg-orange-500 rounded cursor-pointer p-3 text-center m-4' onClick={() => {
            signOut()
        }}>

            Logout
        </div>
    )
}
