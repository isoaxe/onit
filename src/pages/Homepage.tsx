import { primaryMain, textMain } from "./../util/colours";
import LogoutButton from "./../components/LogoutButton";
import { StyleSheet } from "./../util/types";


function Homepage (): JSX.Element {

	return (
		<div style={styles.root}>
			<header style={styles.header}>
				<LogoutButton />
			</header>
		</div>
	);
}

const styles: StyleSheet = {
	root: {
		textAlign: "center",
		backgroundColor: primaryMain,
		minHeight: "calc(100vh - 20px)",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "flex-start",
		padding: "10px",
		color: textMain
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	}
};


export default Homepage;
