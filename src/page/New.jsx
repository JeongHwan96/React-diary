import React from "react";
import MyHeader from "../components/MyHeader";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const New = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <MyHeader
          className="riviewPre"
          headText={"리뷰쓰기"}
          leftChild={
            <Button
              text={"< 메인화면 으로가기"}
              onClick={() => navigate("/")}
            />
          }
        />
      </div>
      <section>
        <h4>날짜</h4>
        <div className="date_Check">
          <input type="date" />
        </div>
      </section>
    </>
  );
};

export default New;
