import styled from "styled-components";
import { tertiaryMain, tertiaryLight, buttonShadow } from "./../util/colours";
import { useAuth } from "./../util/useAuth";


function LogoutButton (): JSX.Element {
	const auth = useAuth();

	function logout () {
		auth.signout();
	}

	return (
		<Button onClick={logout}>
			Logout
		</Button>
	);
}

const Button = styled.div`
	background-color: ${tertiaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: center;
	font-size: 14px;
	padding: 10px;
	margin-bottom: 12px;
	&:hover {
		background-color: ${tertiaryLight};
		cursor: pointer;
	}
`;


export default LogoutButton;
