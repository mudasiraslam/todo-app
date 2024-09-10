
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Todo Page",
    description: "Add Todo List Delete, Update and Add",
    openGraph: {
        title: "MainList - Todo App",
        description: "You can add todo list & There Task.",
    },
};
const AddTodo = dynamic(() => import('../(component)/mainList/mainList'), {
    ssr: false,
});

export default function Page() {
    return <AddTodo />;
}
