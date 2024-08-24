
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Task Page",
    description: "add your task read and delete.",
    openGraph: {
        title: "Task Page - Todo App",
        description: "add your task read and delete.",
    },
};

const Task = dynamic(() => import('../(component)/task/task'), {
    ssr: false,
});

export default function Page() {
    return <Task />;
}