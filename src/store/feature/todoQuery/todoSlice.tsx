import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../todo/todoSlice";

const initialState: TodoState = {
  todoList: {},
  select: null,
  searchKeyword: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.select = state.todoList[id];
    },
    unselectTodo: (state) => {
      state.select = null;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setTodoList: (state, action: PayloadAction<TodoState["todoList"]>) => {
      state.todoList = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { selectTodo, unselectTodo, setSearchKeyword, setTodoList } =
  todoSlice.actions;
