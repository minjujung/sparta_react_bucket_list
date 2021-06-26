import React from 'react';
import styled from "styled-components"
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

const Spinner = (props) => {
    return(
        <Outter>
            <LocalFloristIcon style={{fontSize: "150px", color: "#f9acce"}} />
        </Outter>
    );
};

const Outter = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eee;
`;

export default Spinner;