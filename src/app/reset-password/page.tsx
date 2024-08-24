
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Password Reset Page",
    description: ".",
    openGraph: {
        title: "Settings Page - Todo App",
        description: "Change your Profile Pic, Name, Email, and Password.",
    },
};

const RestPassword = dynamic(() => import('../(component)/resetPassword/resetPassword'), {
    ssr: false,
});

export default function Page() {
    return <RestPassword />;
}