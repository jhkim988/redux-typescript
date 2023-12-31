import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "./feature/todoQuery/todoSlice";
import { apiSlice } from "./feature/todoQuery/apiSlice";
import controlSlice from "./feature/control/controlSlice";
export const store = configureStore({
  reducer: {
    todo: todoSlice,
    control: controlSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
export const useAppDispatch: () => AppDispatcher = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
