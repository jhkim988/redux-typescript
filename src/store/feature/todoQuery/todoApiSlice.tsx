import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, TodoAddArgs, TodoState } from "../todo/todoSlice";

export const todoApiSlice = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "localhost:8080/api" }),
  endpoints: (builder) => ({
    getTodoList: builder.query<void, TodoState["todoList"]>({
      query: () => "/todolist",
    }),
    getTodoDetail: builder.query<Todo, string>({
      query: (todoId) => `/todo/${todoId}`,
    }),
    addTodo: builder.mutation<Todo, TodoAddArgs>({
      query: (todo) => ({
        url: `/todo`,
        method: `POST`,
        body: todo,
      }),
    }),
    editTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: `PUT`,
        body: todo,
      }),
    }),
    removeTodo: builder.mutation<Todo, string>({
      query: (todoId) => ({
        url: `/todo/${todoId}`,
        method: `DELETE`,
      }),
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useGetTodoDetailQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useRemoveTodoMutation,
} = todoApiSlice;
