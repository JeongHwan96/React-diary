import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import New from "./page/New";
import Diary from "./page/Diary";
import Edit from "./page/Edit";

import "./App.css";

//COMPONENTS
import Button from "./components/Button";
import MyHeader from "./components/MyHeader";
import React, { useEffect, useReducer, useRef } from "react";
import { getActiveElement } from "@testing-library/user-event/dist/utils";
import DiaryList from "./components/DiaryList";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
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
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const DiaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(DiaryList[0].id) + 1;

      dispatch({ type: "INIT", data: DiaryList });
    }
  });
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
    dataId.current += 1;
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
