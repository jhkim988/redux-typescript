import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/thunkStore";
import {
  removeTodoFetch,
  unselectTodo,
} from "../../store/feature/todoThunk/todoThunkSlice";
import {
  detailCancelControl,
  editControl,
} from "../../store/feature/control/controlSlice";

export function TodoDetail() {
  const selectTodoData = useAppSelector(
    (state: RootState) => state.todoThunk.select
  );
  const dispatch = useAppDispatch();

  /* Not Choose, TodoDetail 은 selectTodo 가 null 이 아닐 때 렌더링 된다. */
  if (selectTodoData === null) {
    throw new Error("selectTodo 가 null 이면서 TodoDetail 렌더링");
  }

  const handleBack = () => {
    dispatch(unselectTodo());
    dispatch(detailCancelControl());
  };

  const handleRemove = () => {
    dispatch(removeTodoFetch(selectTodoData.id));
  };

  const handleEdit = () => {
    dispatch(editControl());
  };

  return (
    <div className="todo_detail">
      <div>text: {selectTodoData.text}</div>
      <div>status: {selectTodoData.status}</div>
      <div>deadline: {new Date(selectTodoData.deadline).toString()}</div>
      <button onClick={handleBack}>뒤로</button>
      <button onClick={handleEdit}>편집</button>
      <button onClick={handleRemove}>삭제</button>
    </div>
  );
}
