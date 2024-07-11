import styled from "styled-components"

const Score = styled.div`
  color: ${(props) => props.theme.titleFont};
  margin-top: 10px;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 0px 0px 15px red;
`

function Title({ score }) {
  return (
    <Score >Score {score}</Score>
  )
}

export default Title;