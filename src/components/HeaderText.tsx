import styled from "styled-components";
import { textMain } from "./../util/colours";

function HeaderText(props: { text: string }): JSX.Element {
  return <Text>{props.text}</Text>;
}

const Text = styled.div`
  font-size: 16px;
  color: ${textMain};
  margin-top: -10px;
`;

export default HeaderText;
