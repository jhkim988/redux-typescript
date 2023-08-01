import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, TodoAddArgs, TodoState } from "../feature/todo/todoSlice";
import { fetchMock as fetch, todoListMock } from "./fetchMock";
import { AppDispatch } from "../thunkStore";
import {
  detailCancelControl,
  detailControl,
} from "../feature/control/controlSlice";

const initialState: TodoState = {
  todoList: {},
  select: null,
  searchKeyword: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;
      state.todoList[todo.id] = todo;
      state.select = todo;
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;
      state.todoList[todo.id] = todo;
      state.select = todo;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.todoList[id];
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
    setTodoList: (state, action: PayloadAction<TodoState["todoList"]>) => {
      state.todoList = action.payload;
    },
  },
});

export const { selectTodo, unselectTodo, setSearchKeyword } = todoSlice.actions;
const { addTodo, editTodo, removeTodo, setTodoList } = todoSlice.actions;
export default todoSlice.reducer;

let id = 3;
const thunks = {
  addTodoFetch: (todo: TodoAddArgs) => async (dispatch: AppDispatch) => {
    const response = await fetch<Todo>(
      "/todo",
      {
        method: "POST",
        body: JSON.stringify(todo),
      },
      { ...todo, status: "unstarted", id: `${id++}` }
    );
    dispatch(addTodo(response));
    dispatch(detailControl());
  },
  editTodoFetch: (todo: Todo) => async (dispatch: AppDispatch) => {
    const response = await fetch<Todo>(
      `/todo/${todo.id}`,
      { method: "PUT", body: JSON.stringify(todo) },
      todo
    );
    dispatch(editTodo(response));
    dispatch(detailControl());
  },
  removeTodoFetch: (todoId: string) => async (dispatch: AppDispatch) => {
    await fetch(`/todo/${todoId}`, { method: "DELETE" }, undefined);
    dispatch(removeTodo(todoId));
    dispatch(detailCancelControl());
  },
  getTodoList: (keyword: string) => async (dispatch: AppDispatch) => {
    const filteredKeys = Object.keys(todoListMock).filter((id) =>
      todoListMock[id].text.includes(keyword)
    );
    const mockResponse = filteredKeys.reduce((acc, crnt) => {
      acc[crnt] = todoListMock[crnt];
      return acc;
    }, {} as TodoState["todoList"]);
    const response = await fetch(
      `/todolist?keyword=${keyword}`,
      { method: "GET" },
      mockResponse
    );
    dispatch(setTodoList(response));
  },
};

export const { addTodoFetch, editTodoFetch, removeTodoFetch, getTodoList } =
  thunks;
