import React, { useState } from "react";
import style from "./IDSearch.module.css";
import IDSearchPhone from "./IDSearchPhone";

export default function IDSearch() {
  const [button, setButton] = useState(false);
  const handleButton = () => {
    setButton(true);
  };
  return (
    <>
      <form action="" className={style.ID_SEARCH}>
        <label htmlFor="">이름</label>
        <input type="text" placeholder="이름 입력" className={style.name} />
        <label htmlFor="">휴대폰 번호</label>
        <input
          type="text"
          placeholder="- 없이 휴대폰 번호 입력"
          className={style.phone}
        />
      </form>
      {button ? <IDSearchPhone /> : ""}
      <BTN onClick={handleButton} value={button} />
    </>
  );
}

function BTN({ value, onClick }) {
  return (
    <button
      className={style.bluebutton}
      onClick={() => {
        onClick();
      }}
    >
      {value ? "아이디 찾기" : "인증번호 받기"}
    </button>
  );
}