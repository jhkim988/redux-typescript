import { useEffect } from "react";
import { detailControl } from "../../store/feature/control/controlSlice";
import { Todo } from "../../store/feature/todo/todoSlice";
import { getTodoList, selectTodo } from "../../store/todoThunk/todoThunkSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/thunkStore";

export function TodoList() {
  const keyword = useAppSelector(
    (state: RootState) => state.todoThunk.searchKeyword
  );
  const todoList = useAppSelector(
    (state: RootState) => state.todoThunk.todoList
  );
  const selected = useAppSelector((state: RootState) => state.todoThunk.select);
  const dispatch = useAppDispatch();

  const handleSelect = (todo: Todo) => {
    dispatch(selectTodo(todo.id));
    dispatch(detailControl());
  };

  /* Init Data Fetching */
  useEffect(() => {
    dispatch(getTodoList(keyword));
  }, [dispatch, keyword]);

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
