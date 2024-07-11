import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Describes } from "../../images/keyDescribe.svg";

const Wrapper = styled.div`
    margin-top: 12px;
    display: flex;
    width: 80%;
    background-color: ${(props) => props.theme.keyDescribeBoard};
    padding: 5px;
    border-radius: 5px 5px 5px 15px;

    svg {
        margin: 0px 0px 10px 0px;
        height: 100%;
        width: 100%;
    }
`

/* const Item = styled.div`
    display: flex;
    width: 100%;
    margin: 5px;
` */


function KeyDescribe() {
    return (
        <Wrapper>
            <Describes />
        </Wrapper>
    );
}

export default KeyDescribe;