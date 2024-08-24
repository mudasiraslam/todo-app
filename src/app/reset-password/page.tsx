
import dynamic from 'next/dynamic';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Password Reset Page",
    description: "You can Change Reset After getting the token.",
    openGraph: {
        title: "Password Reset Page - Todo App",
        description: "You can Change Reset After getting the token.",
    },
};

const RestPassword = dynamic(() => import('../(component)/resetPassword/resetPassword'), {
    ssr: false,
});

export default function Page() {
    return <RestPassword />;
}