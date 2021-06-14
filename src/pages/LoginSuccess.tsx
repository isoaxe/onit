import styled, { keyframes } from "styled-components";
import GetUsersButton from "./../components/GetUsersButton";
import SetRoleButton from "./../components/SetRoleButton";
import { StyleSheet } from "./../util/types";
import logo from "./../logo.svg";


function LoginSuccess (): JSX.Element {

	return (
		<div style={styles.root}>
			<header style={styles.header}>
				<Logo src={logo} alt="logo"/>
				<p>
          Login successful!
				</p>
				<GetUsersButton />
				<SetRoleButton />
			</header>
		</div>
	);
}

const styles: StyleSheet = {
	root: {
		textAlign: "center"
	},
	header: {
		backgroundColor: "#282c34",
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "calc(10px + 2vmin)",
		color: "white"
	},
	logo: {
		height: "40vmin",
		pointerEvents: "none",
		animation: "rotate infinite 20s linear"
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
