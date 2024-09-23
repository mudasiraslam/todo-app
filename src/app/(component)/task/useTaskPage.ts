import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import {
  fetchTasks,
  addTask,
  deleteTask,
} from "../../../redux/slices/taskSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";
import { themes } from "../../../constants/themes/theme";
import { Theme } from "../../../type/type";

export const useTaskPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const listId = searchParams?.get("page") ?? null;
  const title = searchParams?.get("title") ?? "";
  const themeValue = searchParams?.get("theme") ?? null;

  const dispatch = useDispatch<AppDispatch>();
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const selectedThemeFromLocalStorage = localStorage.getItem("navbarTheme");
    const selectedTheme = themeValue
      ? themes.find((theme) => theme.value === themeValue)
      : selectedThemeFromLocalStorage
      ? JSON.parse(selectedThemeFromLocalStorage)
      : themes.find((theme) => theme.value === "vibrantSpectrum");

    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
      localStorage.setItem("navbarTheme", JSON.stringify(selectedTheme));
    }
  }, [themeValue]);

  const taskState = useSelector((state: RootState) => ({
    tasks: state?.tasks?.tasks ?? [],
    status: state?.tasks?.status ?? "idle",
    error: state?.tasks?.error ?? null,
  }));

  useEffect(() => {
    if (listId) {
      dispatch(fetchTasks(listId));
    }
  }, [dispatch, listId]);

  const handleAddTask = async () => {
    if (!newTaskTitle) {
      toast.error("Task title is required");
      return;
    }
    if (!listId) {
      toast.error("List ID is required to add a task");
      return;
    }
    setLoading(true);
    try {
      const result = unwrapResult(
        await dispatch(addTask({ title: newTaskTitle, listId }))
      );
      await dispatch(fetchTasks(listId));
      setNewTaskTitle("");
      toast.success("Task added successfully");
    } catch (err) {
      toast.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!listId) {
      toast.error("List ID is required to delete a task");
      return;
    }
    try {
      const result = unwrapResult(
        await dispatch(deleteTask({ taskId, listId }))
      );
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  const handleCheckboxChange = (taskId: string, currentStatus: boolean) => {
    const newCompletedTasks = { ...completedTasks, [taskId]: !currentStatus };
    setCompletedTasks(newCompletedTasks);
    toast.success(`Task ${!currentStatus ? "completed" : "not completed"}`);
  };

  return {
    router,
    listId,
    title,
    currentTheme,
    newTaskTitle,
    setNewTaskTitle,
    handleAddTask,
    handleDeleteTask,
    handleCheckboxChange,
    tasks: taskState.tasks,
    taskStatus: taskState.status,
    error: taskState.error,
    completedTasks,
    loading,
  };
};
