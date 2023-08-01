import { configureStore } from "@reduxjs/toolkit";
import todoThunkSlice from "./feature/todoThunk/todoThunkSlice";
import controlSlice from "./feature/control/controlSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    todoThunk: todoThunkSlice,
    control: controlSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
