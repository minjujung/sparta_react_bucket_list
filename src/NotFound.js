import React from 'react';

const NotFound = (props) => {
    return (
        <>
            <h1>주소가 올바르지 않아요ㅜㅜ</h1>
            <button onClick={() => {props.history.goBack()}}>뒤로가기</button>
        </>
    );
};

export default NotFound;