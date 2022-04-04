import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "./../App";
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import Button from "./../components/Button";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">Loading ...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}기록`}
          leftChild={
            <Button text={"< 메인화면 으로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Button text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />
          }
        />

        <section className="detail_emotion">
          <h4>리뷰 점수</h4>
          <img src={curEmotionData.emotion_img} alt="" />
          <div>{curEmotionData.emotion_desc}</div>
        </section>

        <section className="detail_content">
          <h4>리뷰 내용</h4>
          <div>{data.content}</div>
        </section>
      </div>
    );
  }
};

export default Diary;
