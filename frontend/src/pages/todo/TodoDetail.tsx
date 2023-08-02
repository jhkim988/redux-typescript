import { useDispatch, useSelector } from "react-redux";
import {
  detailCancelControl,
  editControl,
} from "../../store/feature/control/controlSlice";
import { unselectTodo, removeTodo } from "../../store/feature/todo/todoSlice";
import { RootState } from "../../store/store";

export function TodoDetail() {
  const selectTodoData = useSelector((state: RootState) => state.todo.select);
  const dispatch = useDispatch();

  /* Not Choose, TodoDetail 은 selectTodo 가 null 이 아닐 때 렌더링 된다. */
  if (selectTodoData === null) {
    throw new Error("selectTodo 가 null 이면서 TodoDetail 렌더링");
  }

  const handleBack = () => {
    dispatch(unselectTodo());
    dispatch(detailCancelControl());
  };

  const handleRemove = () => {
    dispatch(removeTodo(selectTodoData.id));
    dispatch(detailCancelControl());
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
