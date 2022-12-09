import styled from "styled-components";
import { secondaryLight, secondaryMain, tertiaryLight } from "../util/colours";
import { textMain, buttonShadow } from "../util/colours";
import { GenericButtonProps } from "../util/types";

const Item = styled.div<{ label: string; active: string }>`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: left;
	font-size: 14px;
	font-weight: bold;
	color: ${textMain};
	width: 60px;
	padding: 10px;
	margin-bottom: 10px;
	border: ${(props) =>
    props.label.toLowerCase() === props.active
      ? `2px solid ${tertiaryLight};`
      : "none;"}
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;

function MenuItem(props: GenericButtonProps): JSX.Element {
  const { label, active, onClick } = props;

  return (
    <Item onClick={onClick} label={label} active={active}>
      {label}
    </Item>
  );
}

export default MenuItem;
