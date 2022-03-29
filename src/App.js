import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import New from "./page/New";
import Diary from "./page/Diary";
import Edit from "./page/Edit";

import "./App.css";

//COMPONENTS
import Button from "./components/Button";
import MyHeader from "./components/MyHeader";
import React, { useReducer, useRef } from "react";
import { getActiveElement } from "@testing-library/user-event/dist/utils";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1648224749144,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1648224749145,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1648224749146,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1648224749147,
  },
  {
    id: 5,
    emotion: 2,
    content: "오늘의 일기 6번",
    date: 1748224749147,
  },
];
function App() {
  const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
      case "INIT": {
        return action.data;
      }
      case "CREATE": {
        const newItem = {
          ...action.data,
        };
        newState = [newItem, ...state];
        break;
      }
      case "REMOVE": {
        newState = state.fliter((it) => it.id !== action.targetId);
        break;
      }
      case "EDIT": {
        newState = state.map((it) =>
          it.id === action.data.id ? { ...action.data } : it
        );
        break;
      }
      default:
        return state;
    }
    return newState;
  };

  const [data, dispatch] = useReducer(reducer, dummyData);
  console.log(new Date().getTime());

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} alt="" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} alt="" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} alt="" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} alt="" />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} alt="" /> */}
            {/* <Button
          text={"button"}
          onClick={() => alert("Click")}
          type={"positive"}
        />
        <Button
          text={"button"}
          onClick={() => alert("Click")}
          type={"nagative"}
        />
        <Button
          text={"button"}
          onClick={() => alert("Click")}
          type={"default"}
        /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
