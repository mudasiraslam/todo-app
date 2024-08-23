
import dynamic from 'next/dynamic';


const Task = dynamic(() => import('../(component)/task/task'), {
    ssr: false,
});

export default function Page() {
    return <Task />;
}