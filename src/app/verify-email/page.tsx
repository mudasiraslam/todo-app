
import dynamic from 'next/dynamic';


const VerifyEmail = dynamic(() => import('../(component)/verifyEmail/page'), {
    ssr: false,
});

export default function Page() {
    return <VerifyEmail />;
}
