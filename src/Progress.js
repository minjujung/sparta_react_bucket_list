import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Progress = (props) => {
    const bucket_list = useSelector((state) => state.bucket.list)

    let count = 0;
    bucket_list.map((l, idx) => {
        if(l.completed) {
            count++
        }
    })

    return (
        <ProgressBar>
            <HighLight width={(count/bucket_list.length)*100 + "%"}/>
            <Circle></Circle>
        </ProgressBar>
    );
};

const ProgressBar = styled.div`
    background:  #eee;
    width: 100%;
    height: 18px;
    border-radius: 50px;
    display: flex;
    align-items: center;
`;

const Circle = styled.div`
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    background-color: white;
    border: 4px solid pink;
    border-radius: 20px;
    margin-left: -10px;
`;

const HighLight = styled.div`
    background: pink;
    width: ${props => props.width};
    height: 18px;
    border-radius: 50px;
    transition: width 1s;
`;

export default Progress;