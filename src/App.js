import React from "react";

import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import styled from "styled-components";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Progress from './Progress';
import Spinner from './Spinner';

// 리덕스 스토어와 연결하기 위해 connect라는 친구를 호출할게요!
import {connect} from 'react-redux';
// 리덕스 모듈에서 (bucket 모듈에서) 액션 생성 함수 두개를 가져올게요!
import {loadBucketFB, addBucketFB} from './redux/modules/bucket';

import { firestore } from './firebase';

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateTopProps = (state) => ({
  bucket_list: state.bucket.list,
  is_loaded: state.bucket.is_loaded
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadBucketFB());
  },
  create: (new_item) => {
    dispatch(addBucketFB(new_item));
  }
});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
     
    };
    // ref는 이렇게 선언합니다!
    this.text = React.createRef();
  }

  componentDidMount() {
    this.props.load();
    // const bucket = firestore.collection("bucket");

    // //없는 collection이나 doc 에 데이터 추가해도 오류 X
    // bucket.doc("bucket_item").set({text: "수영 배우기", completed: false})

    // //비동기 작업중 => 일단 여기서 요청을 보내놓고 다른 작업을 먼저 할게! 의 의미
    // //`그러다가 응답값이 오면 어떤 작업을 할거야 ` 에서 어떤 작업을 then()안에 정의해줌
    // bucket.doc("bucket_item2").get().then((doc)  => {
    //   if(doc.exists){
    //     console.log(doc.data())
    //     console.log(doc.id)

    //   }
    //   console.log(doc.exists)
    // });



    // // bucket.add({text: "세계일주 하기", completed: false}).then((docRef) => {
    // //   console.log(docRef)
    // //   console.log(docRef.id)
    // // })

    // // bucket.doc("bucket_item1").update({text: "매일 책 10권 읽기"})

    // bucket.doc("bucket_item2").delete().then(docRef => {
    //   console.log("지웠어요!");
    // })
  }

  addBucketList = () => {
    const new_item = this.text.current.value;
    this.props.create(new_item);
    this.text.current.value = ""
  };

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    return (
      <div className="App">
        {this.props.is_loaded ?  
          <>
        <Container>
          <Title>내 버킷리스트</Title>
          <Progress />
          <Line />
          {/* 컴포넌트를 넣어줍니다. */}
          {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
          {/* Route 쓰는 법 2가지를 모두 써봅시다! */}
          <Switch>
            <Route path="/" exact component={BucketList} />
            <Route path="/detail/:index" component={Detail} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
        <Input>
          <input type="text" ref={this.text} />
          <button onClick={this.addBucketList}>추가하기</button>
        </Input>
        {/* 먼가 스무스하게 어떤 요소로 이동하게 하고 싶으면 아래와 같이 top, left, behavior 설정 */}
        <UpBtn onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}>위로가기</UpBtn> 
          </>
        : <Spinner />}
      </div>
    );
  }
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & * {
    padding: 5px;
  }
  & input {
    width: 70%;
    border-radius: 10px;
    &:focus{
      outline: 0 ;
      border-color: pink;
      }
    }

  & button {
  background-color: pink;
  color: white;
  font-weight: 600;
  margin-left: 10px;
  padding: 8px;
  border-radius: 10px;
  border: none;
  }

`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
  color: #f9acce;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

const UpBtn = styled.button`
  background-color: pink;
  color: white;
  font-weight: 600;
  margin-left: 30px;
  padding: 10px;
  border-radius: 10px;
  border: none;
`;
// withRouter 적용
// connect로 묶어줬습니다!
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));