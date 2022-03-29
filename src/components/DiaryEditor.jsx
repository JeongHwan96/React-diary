import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import Button from "../components/Button";
import EmotionItem from "./EmotionItem";
import ReviewText from "./ReviewText";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_desc: "완전 안좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_desc: "안좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_desc: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_desc: "좋음",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_desc: "완전 좋음",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const onClick_Emotion = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "리뷰를 수정하시겠습니까?" : "새로운 리뷰를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <>
      <div className="reviewHeader">
        <MyHeader
          headText={isEdit ? "리뷰수정" : "리뷰쓰기"}
          leftChild={
            <Button
              text={"< 메인화면 으로가기"}
              onClick={() => navigate("/")}
            />
          }
        />

        <section>
          <h4>날짜</h4>
          <div className="date_Check">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>

        <section>
          <h4>제품 평점</h4>
          <div className="emotion_Check">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={onClick_Emotion}
                isSelect={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>

        <section>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="제품은 어떠셨나요?"
          ></textarea>
        </section>

        <section className="CC_Button">
          <Button text={"Cancel"} onClick={() => navigate("/")} />
          <Button type={"positive"} text={"Complete"} onClick={handleSubmit} />
        </section>
      </div>
    </>
  );
};

export default DiaryEditor;
