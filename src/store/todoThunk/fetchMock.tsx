import { TodoState } from "../feature/todo/todoSlice";

export const fetchMock: <T>(
  url: string,
  requestBody: RequestInit,
  mockResponse: T
) => Promise<T> = (url, requestBody, mockResponse) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(
        `fetchMock url - ${url} reequest - `,
        requestBody,
        mockResponse
      );
      resolve(mockResponse);
    }, 3000)
  );
};

export const todoListMock: TodoState["todoList"] = {
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
};
