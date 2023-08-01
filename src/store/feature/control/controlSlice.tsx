import { createSlice } from "@reduxjs/toolkit";

type ControlState = { view: "none" | "detail" | "edit" | "add" };
const initialState: ControlState = { view: "none" };

export const controlSlice = createSlice({
  name: "control",
  initialState,
  reducers: {
    detailControl: (state) => {
      state.view = "detail";
    },
    detailCancelControl: (state) => {
      state.view = "none";
    },
    editControl: (state) => {
      state.view = "edit";
    },
    editCancelControl: (state) => {
      state.view = "detail";
    },
    addControl: (state) => {
      state.view = "add";
    },
    addCancelControl: (state) => {
      state.view = "none";
    },
  },
});

export default controlSlice.reducer;
export const {
  detailControl,
  detailCancelControl,
  editControl,
  editCancelControl,
  addControl,
  addCancelControl,
} = controlSlice.actions;
