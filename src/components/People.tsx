import { textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function People (): JSX.Element {

	return (
		<div style={styles.root}>
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
		padding: "10px",
		color: textMain
	}
};


export default People;
