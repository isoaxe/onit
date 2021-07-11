import styled from "styled-components";
import { textMain } from "./../util/colours";


function HeaderText (): JSX.Element {

	return (
		<Text>
			Welcome, Generic User! | Access level: user | Business name here
		</Text>
	);
}

const Text = styled.div`
	font-size: 16px;
	color: ${textMain};
	margin-top: -18px;
`;


export default HeaderText;
