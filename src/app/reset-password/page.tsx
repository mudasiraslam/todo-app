
import dynamic from 'next/dynamic';


const RestPassword = dynamic(() => import('../(component)/resetPassword/resetPassword'), {
    ssr: false,
});

export default function Page() {
    return <RestPassword />;
}