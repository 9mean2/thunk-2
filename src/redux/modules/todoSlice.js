import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/todos");
      console.log("response", response.data);

      //툴킷제공 api
      // Promise -> resolve (= 네트워크 요청이 성공한 경우) -> dispatch해주는 기능을 가진 api
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error", error);

      //툴킷제공 api
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addList = createAsyncThunk("ADD_TODO", async (newList) => {
  const response = await axios.post("http://localhost:4000/todos", newList);
  return response.data;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      // 통신이 진행중일 때
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    ["ADD_TODO".fulfilled]: (state, { payload }) => [...state, payload],
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
