import { Provider } from "react-redux";
import { store } from "../../store/queryStore";
import { SearchPanel } from "./SearchPanel";
import { TodoList } from "./TodoList";
import { ControlPanel } from "./ControlPanel";

export function TodoQueryApp() {
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
