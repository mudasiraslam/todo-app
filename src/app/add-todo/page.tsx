
import dynamic from 'next/dynamic';


const AddTodo = dynamic(() => import('../(component)/mainList/addTodo'), {
    ssr: false,
});

export default function Page() {
    return <AddTodo />;
}
