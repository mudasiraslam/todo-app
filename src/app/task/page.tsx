
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Settings Page",
    description: "Change your Profile Pic, Name, Email, and Password.",
    openGraph: {
        title: "Settings Page - Todo App",
        description: "Change your Profile Pic, Name, Email, and Password.",
    },
};

const Task = dynamic(() => import('../(component)/task/task'), {
    ssr: false,
});

export default function Page() {
    return <Task />;
}