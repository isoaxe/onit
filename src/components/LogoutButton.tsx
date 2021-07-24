import styled from "styled-components";
import { tertiaryMain, tertiaryLight, buttonShadow } from "./../util/colours";
import { useAuth } from "./../util/useAuth";


function LogoutButton (): JSX.Element {
	const auth = useAuth();

	function logout () {
		auth.signOut();
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
	font-weight: bold;
	padding: 10px;
	&:hover {
		background-color: ${tertiaryLight};
		cursor: pointer;
	}
`;


export default LogoutButton;
