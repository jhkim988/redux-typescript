import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMock as fetch, todoListMock } from "./fetchMock";
import { Todo, TodoAddArgs, TodoState } from "../todo/todoSlice";
import { detailCancelControl, detailControl } from "../control/controlSlice";

const initialState: TodoState = {
  todoList: {},
  select: null,
  searchKeyword: "",
};

const todoSlice = createSlice({
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        thunks.addTodoFetch.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const todo = action.payload;
          state.todoList[todo.id] = todo;
          state.select = todo;
        }
      )
      .addCase(
        thunks.editTodoFetch.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const todo = action.payload;
          state.todoList[todo.id] = todo;
          state.select = todo;
        }
      )
      .addCase(
        thunks.removeTodoFetch.fulfilled,
        (state, action: PayloadAction<string>) => {
          const id = action.payload;
          delete state.todoList[id];
          state.select = null;
        }
      )
      .addCase(
        thunks.getTodoList.fulfilled,
        (state, action: PayloadAction<TodoState["todoList"]>) => {
          state.todoList = action.payload;
        }
      );
  },
});

export const { selectTodo, unselectTodo, setSearchKeyword } = todoSlice.actions;
export default todoSlice.reducer;

let id = 3;
const thunks = {
  addTodoFetch: createAsyncThunk(
    "todo/addTodo",
    async (todo: TodoAddArgs, { dispatch }) => {
      const result = await fetch<Todo>(
        "/todo",
        {
          method: "POST",
          body: JSON.stringify(todo),
        },
        { ...todo, status: "unstarted", id: `${id++}` }
      );
      dispatch(detailControl());
      return result;
    }
  ),
  editTodoFetch: createAsyncThunk(
    "todo/editTodo",
    async (todo: Todo, { dispatch }) => {
      const result = await fetch<Todo>(
        `/todo/${todo.id}`,
        { method: "PUT", body: JSON.stringify(todo) },
        todo
      );
      dispatch(detailControl());
      return result;
    }
  ),
  removeTodoFetch: createAsyncThunk(
    "todo/removeTodo",
    async (todoId: string, { dispatch }) => {
      await fetch(`/todo/${todoId}`, { method: "DELETE" }, undefined);
      dispatch(detailCancelControl());
      return todoId;
    }
  ),
  getTodoList: createAsyncThunk("todo/getTodoList", async (keyword: string) => {
    const filteredKeys = Object.keys(todoListMock).filter((id) =>
      todoListMock[id].text.includes(keyword)
    );
    const mockResponse = filteredKeys.reduce((acc, crnt) => {
      acc[crnt] = todoListMock[crnt];
      return acc;
    }, {} as TodoState["todoList"]);
    return await fetch(
      `/todolist?keyword=${keyword}`,
      { method: "GET" },
      mockResponse
    );
  }),
};

export const { addTodoFetch, editTodoFetch, removeTodoFetch, getTodoList } =
  thunks;
