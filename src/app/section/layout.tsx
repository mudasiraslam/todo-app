import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../libs/AuthOptions'
import { redirect } from 'next/navigation'


interface ProtectedRootLayoutProps {
    children: React.ReactNode
}
export default async function ProtectedRootLayout({
    children
}: ProtectedRootLayoutProps) {

    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        redirect("/signup")
    }
    return (
        <main>
            {children}
        </main>
    )
}
