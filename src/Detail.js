// 리액트 패키지를 불러옵니다.
import React from "react";
import Button from "@material-ui/core/Button"
import { ButtonGroup } from '@material-ui/core';

// redux hook을 불러옵니다.
import { useDispatch, useSelector } from "react-redux";
import {deleteBucketFB, updateBucketFB} from "./redux/modules/bucket"
// 내가 만든 액션 생성 함수를 불러옵니다.
// import {deleteBucket} from "./redux/modules/bucket";

const Detail = (props) => {
    const dispatch = useDispatch();
    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector((state) => state.bucket.list);
  // url 파라미터에서 인덱스 가져오기
  let bucket_index = parseInt(props.match.params.index);

  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <ButtonGroup>
        <Button
        style={{color: "#f9acce",fontWeight: "600"}}
        onClick={() => {
        dispatch(deleteBucketFB(bucket_index));
        props.history.goBack();
        }}>삭제하기</Button>
        <Button onClick={() => {
        dispatch(updateBucketFB(bucket_index));
        props.history.goBack();
        }}>완료하기</Button>
      </ButtonGroup>
    </div>
  );
};

export default Detail;