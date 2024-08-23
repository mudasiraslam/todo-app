import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTodoList } from "../../redux/todoListSlice";
import { RootState, AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { unwrapResult } from "@reduxjs/toolkit";

const useTodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.items);
  const status = useSelector((state: RootState) => state.todos.status);
  const error = useSelector((state: RootState) => state.todos.error);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "idle" && session?.user?.email) {
      dispatch(fetchTodoList(session.user.email));
    }
  }, [status, dispatch, session?.user?.email]);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Data loaded successfully");
    } else if (status === "failed") {
      toast.error(`Error: ${error}`);
    }
  }, [status, error]);

  const handleDeleteTask = async (listId: string) => {
    if (!listId) {
      toast.error("List ID is required to delete a task");
      return;
    }
    try {
      const result = unwrapResult(await dispatch(deleteTask({ listId })));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  const handleUpdateClick = (
    todoId: string,
    currentTitle: string,
    theme: string
  ) => {
    const url = `/add-todo?id=${todoId}&title=${encodeURIComponent(
      currentTitle
    )}&theme=${theme}`;
    router.push(url);
  };

  const handleTitleClick = (
    listId: string,
    currentTitle: string,
    theme: string
  ) => {
    router.push(
      `/task?page=${listId}&title=${encodeURIComponent(
        currentTitle
      )}&theme=${theme}`
    );
  };

  return {
    todos,
    status,
    error,
    handleDeleteTask,
    handleUpdateClick,
    handleTitleClick,
  };
};

export default useTodoList;
