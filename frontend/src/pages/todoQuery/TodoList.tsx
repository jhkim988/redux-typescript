import { useSelector } from "react-redux";
import { useGetTodoListQuery } from "../../store/feature/todoQuery/apiSlice";
import { RootState, useAppDispatch } from "../../store/queryStore";
import { TodoState } from "../../store/feature/todo/todoSlice";
import { selectTodo } from "../../store/feature/todoQuery/todoSlice";

export function TodoList() {
  const { data: todoList } = useGetTodoListQuery("") as {
    data: TodoState["todoList"];
  };
  const selected = useSelector((state: RootState) => state.todo.select);
  const dispatch = useAppDispatch();

  const handleSelect = (todoId: string) => {
    dispatch(selectTodo(todoId));
  };

  return (
    <div className="todo_list">
      {Object.values(todoList).map((todo) => (
        <div
          key={todo.id}
          style={{
            backgroundColor:
              selected !== null && selected.id === todo.id
                ? "#6666FF"
                : "transparent",
          }}
          onClick={() => handleSelect(todo.id)}
        >
          {todo.text} {todo.status} {new Date(todo.deadline).toString()}
        </div>
      ))}
    </div>
  );
}
