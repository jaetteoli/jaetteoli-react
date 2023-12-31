import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavAdmin from "./NavAdmin";
import styles from "./StoreReviewPage.module.css";
import styled from "styled-components";
import starRatingUp from "../../assets/images/star_rating_up.png";
import starRatingDown from "../../assets/images/star_rating_down.png";
import { ReactComponent as CheckCircle } from "../../assets/images/check-circle.svg";
import { ReactComponent as XCircle } from "../../assets/images/x-circle.svg";
import { ReactComponent as Arrow_Right_1 } from "../../assets/images/arrow_right_1.svg";
import { ReactComponent as Arrow_Right_2 } from "../../assets/images/arrow_right_2.svg";
import { ReactComponent as Arrow_Left_1 } from "../../assets/images/arrow_left_1.svg";
import { ReactComponent as Arrow_Left_2 } from "../../assets/images/arrow_left_2.svg";
import { getCookieToken } from "../../store/common/Cookie";
import Pagination from "react-js-pagination";
import { type } from "@testing-library/user-event/dist/type";

export default function StoreReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [startnum, setStartNum] = useState(1);

  const limit = 5; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
    setStartNum((page - 1) * 5 + 1);
  };

  const token = getCookieToken();

  const fetchData = async () => {
    try {
      const response = await fetch("https://www.insung.shop/jat/review/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ACCESS-TOKEN": token,
        },
      });
      const data = await response.json();
      if (!data.isSuccess) {
        console.log(data.message);
        return;
      }
      console.log(data.result);
      setReviews(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMaintain = (prop, result) => {
    const ClickReviewIdx = prop;
    const ClickResult = result;
    console.log(ClickResult);
    goResultAdmin(ClickReviewIdx, ClickResult);
  };

  const handleCancle = (prop, result) => {
    const ClickReviewIdx = prop;
    const ClickResult = result;
    goResultAdmin(ClickReviewIdx, ClickResult);
  };

  async function goResultAdmin(idx, result) {
    const requestBody = {
      reviewIdx: idx,
      status: result,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": token,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(
        "https://www.insung.shop/jat/review/admin",
        requestOptions
      );
      const data = await response.json();
      fetchData();
      if (!data.isSuccess) {
        console.log(data.message);
        return;
      }
      return data.result;
    } catch (error) {
      console.log("서버가 아직 안켜져있습니다.");
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <NavAdmin />
        <div className={styles.wrap_review}>
          <span className={styles.title}>리뷰 관리</span>
          <div className={styles.review_container}>
            <ReviewCard
              results={postsData(reviews)}
              maintain={handleMaintain}
              cancle={handleCancle}
            />
          </div>
          <PaginationBox>
            <Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={5} // 한 페이지당 보여줄 아이템 갯수
              totalItemsCount={reviews.length} // 총 아이템 갯수
              pageRangeDisplayed={5} // paginator의 페이지 범위
              onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
              firstPageText={<Arrow_Left_2 />}
              prevPageText={<Arrow_Left_1 />}
              lastPageText={<Arrow_Right_2 />}
              nextPageText={<Arrow_Right_1 />}
              itemClassFirst="left_endstep"
              itemClassPrev="left_onestep"
              itemClassNext="right_onestep"
              itemClassLast="right_endstep"
            />
          </PaginationBox>
        </div>
      </div>
      <Footer />
    </>
  );
}

const PaginationBox = styled.div`
  width: 70%;
  margin-top: 100px;
  margin-left: 400px;

  .pagination {
    display: flex;
    justify-content: space-between;
    height: 33px;
  }

  .pagination li a {
    display: block;
    width: 33px;
    height: 33px;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 33px;
  }
  .pagination .active a {
    color: rgba(96, 78, 248, 1);
    width: 33px;
    height: 33px;
    background-color: #f5f3ff;
    border-radius: 50%;
    text-align: center;
    line-height: 33px;
  }
  .pagination .left_endstep {
    width: 20px;
  }
  .pagination .left_onestep {
    width: 15px;
  }
  .pagination .right_onestep {
    width: 15px;
  }
  .pagination .right_endstep {
    width: 20px;
  }
`;

function ReviewCard({ results, maintain, cancle }) {
  return (
    <>
      {results.map((result, index) => (
        <div className={styles.review_card} key={index}>
          <div className={styles.top}>
            <div className={styles.review_info}>
              <p className={styles.user_name}>
                {result.customerName.slice(0, -1) + "*"}
              </p>
              <div className={styles.review_source}>
                <div className={styles.starRating}>
                  <div className={styles.starRatingDown}>
                    <img src={starRatingDown}></img>
                    <img src={starRatingDown}></img>
                    <img src={starRatingDown}></img>
                    <img src={starRatingDown}></img>
                    <img src={starRatingDown}></img>
                  </div>
                  <div
                    className={styles.starRatingUp}
                    style={{ width: `${result.reviewStar * 20}%` }}
                  >
                    <img src={starRatingUp}></img>
                    <img src={starRatingUp}></img>
                    <img src={starRatingUp}></img>
                    <img src={starRatingUp}></img>
                    <img src={starRatingUp}></img>
                  </div>
                </div>
                <span className={styles.store_name}>{result.storeName}</span>
              </div>
              <div className={styles.review_desc}>{result.reviewContents}</div>
            </div>
            <img
              src={result.review_url}
              className={styles.review_img}
              alt="리뷰 사진"
            />
          </div>
          <div className={styles.bottom}>
            <div className={styles.result}>
              <div
                className={styles.maintain}
                id={result.reviewIdx}
                onClick={() => maintain(result.reviewIdx, "A")}
              >
                <CheckCircle />
                <p>유지하기</p>
              </div>
              <div
                className={styles.delete}
                id={result.reviewIdx}
                onClick={() => cancle(result.reviewIdx, "D")}
              >
                <XCircle />
                <p>삭제하기</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
