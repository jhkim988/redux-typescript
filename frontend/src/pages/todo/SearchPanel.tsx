import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from "../../store/feature/todo/todoSlice";

export function SearchPanel() {
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useDispatch();

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
