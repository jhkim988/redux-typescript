import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo, TodoAddArgs, TodoState, TodoStatus } from "../todo/todoSlice";
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
    selectTodo: (state, action: PayloadAction<Todo>) => {
      const todo = action.payload;
      state.select = todo;
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

const thunks = {
  addTodoFetch: createAsyncThunk(
    "todo/addTodo",
    async (args: TodoAddArgs, { dispatch }): Promise<Todo> => {
      const resultJson = await fetch("http://localhost:8080/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      }).then((res) => res.json());

      const todo = {
        id: resultJson.id,
        status: "unstarted" as TodoStatus,
        ...args,
      };

      dispatch(selectTodo(todo));
      dispatch(detailControl());
      return todo;
    }
  ),
  editTodoFetch: createAsyncThunk(
    "todo/editTodo",
    async (todo: Todo, { dispatch }): Promise<Todo> => {
      await fetch(`http://localhost:8080/api/todo/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      dispatch(detailControl());
      return todo;
    }
  ),
  removeTodoFetch: createAsyncThunk(
    "todo/removeTodo",
    async (todoId: string, { dispatch }): Promise<string> => {
      await fetch(`http://localhost:8080/api/todo/${todoId}`, {
        method: "DELETE",
      });
      dispatch(detailCancelControl());
      return todoId;
    }
  ),
  getTodoList: createAsyncThunk(
    "todo/getTodoList",
    async (keyword: string): Promise<TodoState["todoList"]> => {
      return await fetch(
        `http://localhost:8080/api/todolist?keyword=${keyword}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
    }
  ),
};

export const { addTodoFetch, editTodoFetch, removeTodoFetch, getTodoList } =
  thunks;
