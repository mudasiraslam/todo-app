import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo, Task } from "../app/type/type.todo";
import axios from "axios";

interface TodosState {
  items: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchTodoList = createAsyncThunk<Todo[], string>(
  "todos/fetchTodoList",
  async (email) => {
    const response = await axios.post("/api/todos/get", { email });
    return response.data;
  }
);

export const addTodo = createAsyncThunk<
  Todo,
  { title: string; email: string; theme: string }
>("todos/addTodo", async ({ title, email, theme }) => {
  const response = await axios.post("/api/todos/add/lists", {
    title,
    email,
    theme,
  });
  return response.data;
});

export const updateTodo = createAsyncThunk<
  Todo,
  { id: string; title: string; theme: string }
>("todos/update", async ({ id, title, theme }) => {
  const response = await axios.put("/api/todos/update/lists", {
    listId: id,
    title,
    theme,
  });
  return response.data;
});
export const deleteTask = createAsyncThunk(
  "todos/delete",
  async ({ listId }: { listId: string }) => {
    await axios.delete(`/api/todos/delete/lists`, {
      data: { listId },
    });
    return listId;
  }
);
const todoListSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTodoList.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
        state.status = "idle";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTodo = action.payload;

        const newItems = state.items.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );

        state.items = newItems;
      })

      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update todo";
      })

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = "succeeded";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default todoListSlice.reducer;
