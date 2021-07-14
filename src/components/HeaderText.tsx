import styled from "styled-components";
import { textMain } from "./../util/colours";


function HeaderText (props): JSX.Element {

	return (
		<Text>
			Welcome, {props.name} | Access level: {props.role} | Business name here
		</Text>
	);
}

const Text = styled.div`
	font-size: 16px;
	color: ${textMain};
	margin-top: -18px;
`;


export default HeaderText;
