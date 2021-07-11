import { primaryMain, secondaryMain, textMain } from "./../util/colours";
import LogoutButton from "./../components/LogoutButton";
import HeaderText from "./../components/HeaderText";
import { StyleSheet } from "./../util/types";


function Homepage (): JSX.Element {

	return (
		<div style={styles.root}>
			<div style={styles.wrapper}>
				<header style={styles.header}>
					<HeaderText />
					<LogoutButton />
				</header>
			</div>
		</div>
	);
}

const styles: StyleSheet = {
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		backgroundColor: primaryMain,
		minHeight: "calc(100vh - 44px)",
		padding: "10px",
		color: textMain
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "1200px",
		minHeight: "inherit",
		padding: "10px",
		border: `2px ${secondaryMain} solid`,
		borderRadius: "10px"
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "100%"
	}
};


export default Homepage;
