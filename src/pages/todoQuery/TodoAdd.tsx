import { useReducer } from "react";
import { TodoAddArgs } from "../../store/feature/todo/todoSlice";
import { useAppDispatch } from "../../store/queryStore";
import { addCancelControl } from "../../store/feature/control/controlSlice";
import { useAddTodoMutation } from "../../store/feature/todoQuery/todoApiSlice";

const CHANGE_TEXT = "change_text";
const CHANGE_YEAR = "change_year";
const CHANGE_MONTH = "change_month";
const CHANGE_DATE = "change_date";

type InputState = {
  text: string;
  year: number;
  month: number;
  date: number;
};

type ActionType =
  | { type: typeof CHANGE_TEXT; payload: string }
  | { type: typeof CHANGE_YEAR; payload: number }
  | { type: typeof CHANGE_MONTH; payload: number }
  | { type: typeof CHANGE_DATE; payload: number };

const date = new Date();

const initState: InputState = {
  text: "",
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
};

function reducer(state: InputState, action: ActionType): InputState {
  switch (action.type) {
    case CHANGE_TEXT: {
      return { ...state, text: action.payload };
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

function inputStateToTodoAddArgs(state: InputState): TodoAddArgs {
  const deadline = new Date();
  deadline.setFullYear(state.year);
  deadline.setMonth(state.month);
  deadline.setDate(state.date);
  return {
    text: state.text,
    deadline: deadline.getTime(),
  };
}

export function TodoAdd() {
  const [inputState, inputDispatch] = useReducer(reducer, initState);
  const [addTodo] = useAddTodoMutation();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(addCancelControl());
  };

  const handleSubmit = () => {
    addTodo(inputStateToTodoAddArgs(inputState));
  };

  return (
    <div className="todo_add">
      <div>
        text:{" "}
        <input
          value={inputState.text}
          onChange={(e) =>
            inputDispatch({ type: CHANGE_TEXT, payload: e.target.value })
          }
        />
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
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}
