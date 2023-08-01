import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TodoDetail } from "./TodoDetail";
import { TodoEdit } from "./TodoEdit";
import { TodoAdd } from "./TodoAdd";
import { addControl } from "../../store/feature/control/controlSlice";

export function ControlPanel() {
  const view = useSelector((state: RootState) => state.control.view);
  const dispatch = useDispatch();

  if (view === "detail") {
    return <TodoDetail />;
  } else if (view === "edit") {
    return <TodoEdit />;
  } else if (view === "add") {
    return <TodoAdd />;
  } else {
    return (
      <div>
        <button onClick={() => dispatch(addControl())}>할 일 추가</button>
      </div>
    );
  }
}
