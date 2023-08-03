import { TodoApp } from "./pages/todo/TodoApp";
import { TodoThunkApp } from "./pages/todoThunk/TodoThunkApp";
import { TodoQueryApp } from "./pages/todoQuery/TodoQueryApp";

function App() {
  return (
    <>
      <TodoApp />
      <hr />
      <TodoThunkApp />
      <hr />
      <TodoQueryApp />
    </>
  );
}

export default App;
