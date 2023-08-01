import { Provider } from "react-redux";
import { ControlPanel } from "./ControlPanel";
import { SearchPanel } from "./SearchPanel";
import { TodoList } from "./TodoList";
import { store } from "../../store/thunkStore";

export function TodoThunkApp() {
  return (
    <>
      <Provider store={store}>
        <SearchPanel />
        <TodoList />
        <ControlPanel />
      </Provider>
    </>
  );
}
