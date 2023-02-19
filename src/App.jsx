import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { __getTodos } from "./redux/modules/todoSlice";

function App() {
  const dispatch = useDispatch();

  const { isLoading, error, todos } = useSelector((state) => {
    return state.todos;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  if (isLoading) {
    return <div>로딩중!</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {todos.map((todos) => {
        return <div key={todos.id}>{todos.title}</div>;
      })}
    </div>
  );
}

export default App;
