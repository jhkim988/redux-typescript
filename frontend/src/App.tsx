import { TodoApp } from "./pages/todo/TodoApp";
// import { TodoQueryApp } from "./pages/todoQuery/TodoQueryApp";
import { TodoThunkApp } from "./pages/todoThunk/TodoThunkApp";

function App() {
  return (
    <>
      <TodoApp />
      <hr />
      <TodoThunkApp />
      <hr />
      {/* <TodoQueryApp /> */}
    </>
  );
}

export default App;
