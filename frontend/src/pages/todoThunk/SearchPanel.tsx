import { useState } from "react";
import { useAppDispatch } from "../../store/thunkStore";
import { setSearchKeyword } from "../../store/feature/todoThunk/todoThunkSlice";

export function SearchPanel() {
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(setSearchKeyword(keyword));
  };

  const handleInitialize = () => {
    setKeyword("");
    dispatch(setSearchKeyword(""));
  };

  return (
    <div className="todo_search">
      <input
        placeholder="검색어"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <button onClick={handleInitialize}>초기화</button>
    </div>
  );
}
