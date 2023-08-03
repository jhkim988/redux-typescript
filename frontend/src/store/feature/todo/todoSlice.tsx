import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
  status: TodoStatus;
  deadline: number;
};

export type TodoStatus = "unstarted" | "proceeding" | "success";

export type TodoState = {
  todoList: { [id: string]: Todo };
  select: Todo | null;
  searchKeyword: string;
};

export type TodoAddArgs = {
  text: string;
  deadline: number;
};

const initialState: TodoState = {
  todoList: {
    "1": {
      id: "1",
      text: "test1",
      status: "unstarted",
      deadline: new Date("2023-07-01").getTime(),
    },
    "2": {
      id: "2",
      text: "test2",
      status: "proceeding",
      deadline: new Date("2023-07-01").getTime(),
    },
  },
  select: null,
  searchKeyword: "",
};

let id = 2;
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoAddArgs>) => {
      const args = action.payload;
      const todo: Todo = {
        id: `${++id}`,
        text: args.text,
        status: "unstarted",
        deadline: args.deadline,
      };
      state.todoList[todo.id] = todo;
      state.select = todo;
      state.searchKeyword = "";
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const args = action.payload;
      state.todoList[args.id] = args;
      state.select = args;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.todoList[id];
      if (state.select !== null && state.select.id === id) {
        state.select = null;
      }
    },
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
  },
});

export const {
  addTodo,
  editTodo,
  removeTodo,
  selectTodo,
  unselectTodo,
  setSearchKeyword,
} = todoSlice.actions;
export default todoSlice.reducer;
