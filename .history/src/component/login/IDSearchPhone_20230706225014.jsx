import React from "react";
import style from "./SearchPhone.module.css";

export default function IDSearchPhone() {
  return (
    <>
      <form action="" className={style.ID_SEARCH}>
        <label htmlFor="">인증번호</label>
        <input
          type="text"
          placeholder="인증번호 입력"
          className={style.certification}
        />
      </form>
      <p className={style.phoneretry}>
        인증번호 전송은 통신사에 따라 최대 1분까지 소요할 수 있습니다.
        인증번호가 도착하지 않으면 <strong>인증번호 재전송</strong>을
        눌러주세요.
      </p>
      <button className={style.bluebutton}>아이디 찾기</button>
    </>
  );
}
