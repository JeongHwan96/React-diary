import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import Button from "../components/Button";
import EmotionItem from "./EmotionItem";
import ReviewText from "./ReviewText";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
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

  const handleRemove = () => {
    if (window.confirm("정말 삭제하겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
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
          rightChild={
            isEdit && (
              <Button
                text={"삭제하기"}
                type={"negative"}
                onClick={handleRemove}
              />
            )
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
