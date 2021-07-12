import styled from "styled-components";
import { secondaryMain, secondaryLight, buttonShadow } from "./../util/colours";
import { GenericButtonProps } from "./../util/types";


function SignUpButton (props: GenericButtonProps): JSX.Element {
	return (
		<Button onClick={props.onClick}>
			{props.label}
		</Button>
	);
}

const Button = styled.div`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: center;
	font-size: 14px;
	padding: 10px;
	margin-bottom: 12px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default SignUpButton;
