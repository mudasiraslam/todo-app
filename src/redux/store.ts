import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoListSlice";
import taskSlice from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    tasks: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
