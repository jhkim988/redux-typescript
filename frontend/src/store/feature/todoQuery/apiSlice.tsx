import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, TodoAddArgs, TodoState } from "../todo/todoSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: ["todolist", "todoDetail"],
  endpoints: (builder) => ({
    getTodoList: builder.query<TodoState["todoList"], string>({
      query: (keyword) => `/todolist?keyword=${keyword}`,
      // providesTags: (_, __, args) => [{ type: "todolist", id: args }],
      providesTags: ["todolist"],
    }),
    getTodoDetail: builder.query<Todo, string>({
      query: (todoId) => `/todo/${todoId}`,
      providesTags: ["todoDetail"],
    }),
    addTodo: builder.mutation<{ id: string }, TodoAddArgs>({
      query: (todo) => ({
        url: `/todo`,
        method: `POST`,
        body: todo,
      }),
      invalidatesTags: ["todolist"],
    }),
    editTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: `PUT`,
        body: todo,
      }),
      invalidatesTags: ["todolist", "todoDetail"],
    }),
    removeTodo: builder.mutation<Todo, string>({
      query: (todoId) => ({
        url: `/todo/${todoId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["todolist"],
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useGetTodoDetailQuery,
  useLazyGetTodoDetailQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useRemoveTodoMutation,
} = apiSlice;
