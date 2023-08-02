import { useReducer } from "react";
import { Todo, TodoStatus } from "../../store/feature/todo/todoSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/queryStore";
import { editCancelControl } from "../../store/feature/control/controlSlice";
import { useEditTodoMutation } from "../../store/feature/todoQuery/apiSlice";

const CHANGE_TEXT = "change_text";
const CHANGE_STATUS = "change_status";
const CHANGE_YEAR = "change_year";
const CHANGE_MONTH = "change_month";
const CHANGE_DATE = "change_date";

type ActionType =
  | { type: typeof CHANGE_TEXT; payload: string }
  | { type: typeof CHANGE_STATUS; payload: TodoStatus }
  | { type: typeof CHANGE_YEAR; payload: number }
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_DATE; payload: number };

type InputState = {
  text: string;
  status: TodoStatus;
  year: number;
  month: number;
  date: number;
};

function reducer(state: InputState, action: ActionType): InputState {
  switch (action.type) {
    case CHANGE_TEXT: {
      return { ...state, text: action.payload };
    }
    case CHANGE_STATUS: {
      return { ...state, status: action.payload };
    }
    case CHANGE_YEAR: {
      return { ...state, year: action.payload };
    }
    case CHANGE_MONTH: {
      return { ...state, month: action.payload };
    }
    case CHANGE_DATE: {
      return { ...state, date: action.payload };
    }
    default: {
      throw new Error(
        `Unsupported Operation Exception - TodoEdit - action.type}`
      );
    }
  }
}

const initState: InputState = {
  text: "",
  status: "unstarted",
  year: 1900,
  month: 1,
  date: 1,
};

function initFunction(selectedTodo: Todo): InputState {
  const selectedDeadline = new Date(selectedTodo.deadline);
  return {
    text: selectedTodo.text,
    status: selectedTodo.status,
    year: selectedDeadline.getFullYear(),
    month: selectedDeadline.getMonth() + 1,
    date: selectedDeadline.getDate(),
  };
}

function inputToTodo(id: string, input: InputState): Todo {
  const deadline = new Date();
  deadline.setFullYear(input.year);
  deadline.setMonth(input.month);
  deadline.setDate(input.date);
  return {
    id,
    text: input.text,
    status: input.status,
    deadline: deadline.getTime(),
  };
}

export function TodoEdit() {
  const selectTodoData = useAppSelector(
    (state: RootState) => state.todo.select
  );

  if (selectTodoData === null) {
    throw new Error("selectTodo 가 null 이면서 TodoEdit 렌더링");
  }
  const dispatch = useAppDispatch();
  const [editTodo] = useEditTodoMutation();
  const [inputState, inputDispatch] = useReducer(reducer, initState, () =>
    initFunction(selectTodoData)
  );

  const date = new Date(selectTodoData.deadline);

  const handleBack = () => {
    dispatch(editCancelControl());
  };

  const handleSubmit = () => {
    editTodo(inputToTodo(selectTodoData.id, inputState));
  };

  return (
    <div className="todo_edit">
      <div>
        text:{" "}
        <input
          placeholder={selectTodoData.text}
          value={inputState.text}
          onChange={(e) =>
            inputDispatch({ type: CHANGE_TEXT, payload: e.target.value })
          }
        />
      </div>
      <div>
        status:{" "}
        <select
          defaultValue={selectTodoData.status}
          onChange={(e) => {
            inputDispatch({
              type: CHANGE_STATUS,
              payload: e.target.value as TodoStatus,
            });
          }}
        >
          <option value="unstarted">시작 전</option>
          <option value="proceeding">진행중</option>
          <option value="success">완료</option>
        </select>
      </div>
      <div>
        deadline:{" "}
        <input
          type="number"
          placeholder={`${date.getFullYear()}년`}
          value={inputState.year}
          onChange={(e) =>
            inputDispatch({
              type: CHANGE_YEAR,
              payload: Number(e.target.value),
            })
          }
        />{" "}
        <input
          type="number"
          placeholder={`${date.getMonth() + 1}월`}
          value={inputState.month}
          onChange={(e) =>
            inputDispatch({
              type: CHANGE_MONTH,
              payload: Number(e.target.value),
            })
          }
        />{" "}
        <input
          type="number"
          placeholder={`${date.getDate()}일`}
          value={inputState.date}
          onChange={(e) =>
            inputDispatch({
              type: CHANGE_DATE,
              payload: Number(e.target.value),
            })
          }
        />
      </div>
      <button onClick={handleBack}>뒤로</button>
      <button onClick={handleSubmit}>편집</button>
    </div>
  );
}
