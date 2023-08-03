import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TodoState = {
  selectId: string | null;
  searchKeyword: string;
};

const initialState: TodoState = {
  selectId: null,
  searchKeyword: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<string>) => {
      state.selectId = `${action.payload}`;
    },
    unselectTodo: (state) => {
      state.selectId = null;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { selectTodo, unselectTodo, setSearchKeyword } = todoSlice.actions;
