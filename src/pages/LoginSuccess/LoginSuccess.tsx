import GetUsersButton from "./../../components/GetUsersButton/GetUsersButton";
import SetRoleButton from "./../../components/SetRoleButton/SetRoleButton";
import { StyleSheet } from "./../../util/types";
import logo from "./../../logo.svg";
import "./LoginSuccess.css";


function LoginSuccess (): JSX.Element {

	return (
		<div style={styles.root}>
			<header style={styles.header}>
				<img src={logo} style={styles.logo} className="logo" alt="logo" />
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
		animation: "logo-spin infinite 20s linear"
	}
};


export default LoginSuccess;
