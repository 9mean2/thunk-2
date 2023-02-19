import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addList, __getTodos } from "./redux/modules/todoSlice";
function App() {
  //-----post---------//
  const [inputValue, setInputValue] = useState("");

  const onCreate = () => {
    if (inputValue) {
      const newList = { title: inputValue };
      dispatch(addList(newList));
      setInputValue("");
    } else {
      alert("ㅋㅋ님 적으셔야죠");
    }
  };
  //-----post---------//

  //---------delete---------//

  //---------delete---------//

  //------------get--------//
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
  //------------get--------//

  return (
    <form action="" onSubmit={onCreate}>
      <h3>작성자</h3>
      <StAddInput
        placeholder="뭐라도 적어봐요!!"
        type="text"
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
      />
      <div>
        <h1>내 할일</h1>
        {todos.map((todos) => {
          return (
            <StBox key={todos.id}>
              <h1>제목 : {todos.title}</h1>
              <h3>작성자 : {todos.writer}</h3>
            </StBox>
          );
        })}
        <button type="submit">추가</button>
      </div>
    </form>
  );
}

const StBox = styled.div`
  width: 300px;
  height: 150px;
  border: 1px solid red;
  margin: 20px;
  padding-top: 1.5%;
  text-align: center;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
  box-shadow: 1px 1px 1px 1px gray;
`;

export default App;
