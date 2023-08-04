import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { TodoState, Todo, TodoAddArgs } from "../todo/todoSlice";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async (query) => {
    try {
      const { url, method, data, params } = query;
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const axiosSlice = createApi({
  reducerPath: "axios",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/api" }),
  tagTypes: ["todolist", "todoDetail"],
  endpoints: (builder) => ({
    getTodoList: builder.query<TodoState["todoList"], string>({
      query: (keyword) => ({
        url: `/todolist`,
        method: "GET",
        params: { keyword },
      }),
      providesTags: ["todolist"],
    }),
    getTodoDetail: builder.query<Todo, string>({
      query: (todoId) => ({
        url: `/todo/${todoId}`,
        method: "GET",
      }),
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
} = axiosSlice;
