
import dynamic from 'next/dynamic';


const VerifyEmail = dynamic(() => import('../../app/(component)/verify-email/verify-email'), {
    ssr: false, // Ensures that the component is only rendered on the client-side
});

export default function Page() {
    return <VerifyEmail />;
}
