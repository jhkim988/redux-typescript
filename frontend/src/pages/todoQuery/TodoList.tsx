import { useSelector } from "react-redux";
import { useGetTodoListQuery } from "../../store/feature/todoQuery/apiSlice";
import { RootState, useAppDispatch } from "../../store/queryStore";
import { selectTodo } from "../../store/feature/todoQuery/todoSlice";
import { detailControl } from "../../store/feature/control/controlSlice";

export function TodoList() {
  const searchKeyword = useSelector(
    (state: RootState) => state.todo.searchKeyword
  );
  const { data: todoList, isSuccess } = useGetTodoListQuery(searchKeyword);
  const selectedId = useSelector((state: RootState) => state.todo.selectId);

  const dispatch = useAppDispatch();

  const handleSelect = (todoId: string) => {
    dispatch(selectTodo(todoId));
    dispatch(detailControl());
  };

  console.log("TodoList", typeof selectedId);

  return (
    isSuccess && (
      <div className="todo_list">
        {Object.values(todoList).map((todo) => (
          <div
            key={todo.id}
            style={{
              backgroundColor:
                selectedId === todo.id ? "#6666FF" : "transparent",
            }}
            onClick={() => handleSelect(todo.id)}
          >
            {todo.text} {todo.status} {new Date(todo.deadline).toString()}
          </div>
        ))}
      </div>
    )
  );
}
