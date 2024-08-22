import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskState } from "../type/type.todo";
import axios from "axios";

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (listId: string) => {
    const response = await axios.post("/api/todos/get/task", { listId });
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: { title: string; listId: string }) => {
    const response = await axios.post("/api/todos/add/task", task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ taskId, listId }: { taskId: string; listId: string }) => {
    const response = await axios.delete(`/api/todos/delete/task`, {
      data: { taskId, listId },
    });
    return taskId;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
