import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const sortEmotionList = [
  { value: "all", name: "모두 보기" },
  { value: "good", name: "기분좋음" },
  { value: "nomal", name: "기분보통" },
  { value: "bad", name: "기분나쁨" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [Emotion, setEmotion] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (Emotion === "good") {
        return parseInt(item.emotion) > 1 && parseInt(item.emotion) <= 3;
      } else if (Emotion === "bad") {
        return parseInt(item.emotion) >= 4;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const emotionedList =
      Emotion === "all"
        ? copyList
        : copyList.filter((it) => filterCallBack(it));
    const sortedList = emotionedList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />

          <ControlMenu
            value={Emotion}
            onChange={setEmotion}
            optionList={sortEmotionList}
          />
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"새 리뷰쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diartList: [],
};

export default DiaryList;
