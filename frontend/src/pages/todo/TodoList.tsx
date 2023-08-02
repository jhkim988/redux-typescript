import { useSelector, useDispatch } from "react-redux";
import { detailControl } from "../../store/feature/control/controlSlice";
import {
  selectTodo,
  Todo,
  TodoState,
} from "../../store/feature/todo/todoSlice";
import { RootState } from "../../store/store";

export function TodoList() {
  const keyword = useSelector((state: RootState) => state.todo.searchKeyword);
  const selected = useSelector((state: RootState) => state.todo.select);
  let todoList = useSelector((state: RootState) => state.todo.todoList);

  /* TodoState 에서 찾는다. */
  if (keyword !== "") {
    const filteredKey = Object.keys(todoList).filter((id) =>
      todoList[id].text.includes(keyword)
    );
    todoList = filteredKey.reduce((acc, crnt) => {
      acc[crnt] = todoList[crnt];
      return acc;
    }, {} as TodoState["todoList"]);
  }

  const dispatch = useDispatch();

  const handleSelect = (todo: Todo) => {
    dispatch(selectTodo(todo.id));
    dispatch(detailControl());
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
          onClick={() => handleSelect(todo)}
        >
          {todo.text} {todo.status} {new Date(todo.deadline).toString()}
        </div>
      ))}
    </div>
  );
}
