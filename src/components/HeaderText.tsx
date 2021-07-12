import styled from "styled-components";
import { useAuth } from "./../util/useAuth";
import { textMain } from "./../util/colours";


function HeaderText (): JSX.Element {
	const auth = useAuth();

	return (
		<Text>
			Welcome, {auth.user.displayName} | Access level: user | Business name here
		</Text>
	);
}

const Text = styled.div`
	font-size: 16px;
	color: ${textMain};
	margin-top: -18px;
`;


export default HeaderText;
