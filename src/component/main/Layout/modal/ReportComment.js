import Modal from "../../UI/Modal";
import classes from "./FinishStore.module.css";

const ReportComment = (props) => {

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <div className={classes.top}>
          <span>신고하기</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClose}
          >
            <g id="Frame" clip-path="url(#clip0_811_577)">
              <path
                id="Color"
                d="M12 1.5L10.5 0L6 4.5L1.5 0L0 1.5L4.5 6L0 10.5L1.5 12L6 7.5L10.5 12L12 10.5L7.5 6L12 1.5Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_811_577">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={classes["finish-container"]}>
          <div className={classes["finish-inner"]}>
            <span className={classes["finish-span"]}>
              신고하시겠습니까?
            </span>
          </div>
          <div className={classes["finish-bottom"]}>
            <button
              className={`${classes["finish-button"]} ${classes["button-no"]}`}
              onClick={props.onClose}
            >
              아니요
            </button>
            <button
              className={`${classes["finish-button"]} ${classes["button-yes"]}`}
              
            >
              네
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportComment;
