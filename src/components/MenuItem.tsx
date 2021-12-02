import styled from "styled-components";
import { secondaryMain, secondaryLight, textMain, buttonShadow } from "./../util/colours";
import { GenericButtonProps } from "./../util/types";


function MenuItem (props: GenericButtonProps): JSX.Element {
	const label = props.label;

	return (
		<Item onClick={props.onClick}>
			{label}
		</Item>
	);
}

const Item = styled.div`
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
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default MenuItem;
