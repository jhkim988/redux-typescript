import {
  detailCancelControl,
  editControl,
} from "../../store/feature/control/controlSlice";
import {
  useGetTodoDetailQuery,
  useRemoveTodoMutation,
} from "../../store/feature/todoQuery/apiSlice";
import { unselectTodo } from "../../store/feature/todoQuery/todoSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/queryStore";

export function TodoDetail() {
  const selectedId = useAppSelector((state: RootState) => state.todo.selectId);
  const dispatch = useAppDispatch();
  const { data: selectTodoDetail, isSuccess } = useGetTodoDetailQuery(
    selectedId ?? "",
    { skip: selectedId === null }
  );
  const [removeTodo] = useRemoveTodoMutation();

  /* Not Choose, TodoDetail 은 selectTodo 가 null 이 아닐 때 렌더링 된다. */
  if (selectedId === null) {
    // throw new Error("selectTodo 가 null 이면서 TodoDetail 렌더링");
    return <div>Not Found!</div>;
  }

  if (selectTodoDetail === undefined) {
    return <div>Not Found!</div>;
  }

  const handleBack = () => {
    dispatch(unselectTodo());
    dispatch(detailCancelControl());
  };

  const handleRemove = () => {
    removeTodo(selectedId);
    dispatch(detailCancelControl());
  };

  const handleEdit = () => {
    dispatch(editControl());
  };

  return isSuccess ? (
    <div className="todo_detail">
      <div>text: {selectTodoDetail.text}</div>
      <div>status: {selectTodoDetail.status}</div>
      <div>deadline: {new Date(selectTodoDetail.deadline).toString()}</div>
      <button onClick={handleBack}>뒤로</button>
      <button onClick={handleEdit}>편집</button>
      <button onClick={handleRemove}>삭제</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
