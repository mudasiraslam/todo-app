
import dynamic from 'next/dynamic';


const VerifyEmail = dynamic(() => import('../../app/(component)/verify-email/verify-email'), {
    ssr: false,
});

export default function Page() {
    return <VerifyEmail />;
}
