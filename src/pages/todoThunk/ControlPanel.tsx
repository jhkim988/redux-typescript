import { addControl } from "../../store/feature/control/controlSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/thunkStore";
import { TodoAdd } from "./TodoAdd";
import { TodoDetail } from "./TodoDetail";
import { TodoEdit } from "./TodoEdit";

export function ControlPanel() {
  const view = useAppSelector((state: RootState) => state.control.view);
  const dispatch = useAppDispatch();

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
