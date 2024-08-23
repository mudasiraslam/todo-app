// app/add-todo/page.tsx (or similar, based on your file structure)
import dynamic from 'next/dynamic';

// Dynamically import the AddTodo component with no server-side rendering
const AddTodo = dynamic(() => import('../(component)/mainList/addTodo'), {
    ssr: false, // Ensures that the component is only rendered on the client-side
});

export default function Page() {
    return <AddTodo />;
}
