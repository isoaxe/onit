import styled, { keyframes } from "styled-components";
import GetUsersButton from "./../components/GetUsersButton";
import SetRoleButton from "./../components/SetRoleButton";
import { primaryMain, textMain } from "./../util/colours";
import { useAuth } from "./../util/useAuth";
import { StyleSheet } from "./../util/types";
import logo from "./../logo.svg";


function LoginSuccess (): JSX.Element {
	const auth = useAuth();

	function logout () {
		auth.signout();
	}

	return (
		<div style={styles.root}>
			<header style={styles.header}>
				<Logo src={logo} alt="logo"/>
				<p>
          Login successful!
				</p>
				<GetUsersButton />
				<SetRoleButton />
				<button style={styles.logoutButton} onClick={logout}>Logout</button>
			</header>
		</div>
	);
}

const styles: StyleSheet = {
	root: {
		textAlign: "center"
	},
	header: {
		backgroundColor: primaryMain,
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "calc(10px + 2vmin)",
		color: textMain
	},
	logo: {
		height: "40vmin",
		pointerEvents: "none",
		animation: "rotate infinite 20s linear"
	},
	logoutButton: {
		marginTop: "15px"
	}
};

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const Logo = styled.img`
	height: 40vmin;
	pointerEvents: none;
	animation: ${rotate} infinite 20s linear;
`;


export default LoginSuccess;
