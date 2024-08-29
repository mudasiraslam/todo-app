import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  addTodo,
  updateTodo,
  fetchTodoList,
} from "../../../redux/todoListSlice";
import type { AppDispatch } from "../../../redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { themes } from "../themes/theme";
import { Theme } from "../../type/type.todo";

const useTodoForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  useEffect(() => {
    const todoId = searchParams?.get("id");
    const todoTitle = searchParams?.get("title");
    const todoTheme = searchParams?.get("theme");

    if (todoId && todoTitle && todoTheme) {
      setTitle(todoTitle);
      const theme = themes.find((t) => t.value === todoTheme);
      setSelectedTheme(theme || null);
    }
  }, [searchParams]);

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    toast.success(`Selected theme: ${theme.name}`);
    localStorage.setItem("navbarTheme", JSON.stringify(theme));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedTheme) {
      toast.error("Please select a theme!");
      setLoading(false);
      return;
    }

    try {
      const todoId = searchParams?.get("id") || "";

      if (todoId) {
        await dispatch(
          updateTodo({ id: todoId, title, theme: selectedTheme.value })
        ).unwrap();
        toast.success("Todo updated successfully!");
      } else {
        await dispatch(
          addTodo({
            title,
            email: session?.user?.email ?? "",
            theme: selectedTheme.value,
          })
        ).unwrap();
        toast.success("Todo added successfully!");
      }

      await dispatch(fetchTodoList(session?.user?.email || ""));
      setTitle("");
      setSelectedTheme(null);
      router.push("/");
    } catch (error) {
      toast.error("Error saving todo");
      console.error("SaveTodo Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    loading,
    selectedTheme,
    handleThemeClick,
    handleSubmit,
    searchParams,
    router,
  };
};

export default useTodoForm;
