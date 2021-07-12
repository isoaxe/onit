import styled from "styled-components";
import { secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { SignUpButtonProps } from "./../util/types";


function MenuItem (props: SignUpButtonProps): JSX.Element {

	return (
		<Item onClick={props.onClick}>
			{props.label}
		</Item>
	);
}

const Item = styled.div`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: left;
	font-size: 14px;
	color: ${textMain};
	width: 70px;
	padding: 10px;
	margin-bottom: 10px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default MenuItem;