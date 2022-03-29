import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_desc,
  onClick,
  isSelect,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelect ? `EmotionItem${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_desc}</span>
    </div>
  );
};

export default EmotionItem;
