import { textMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function TaskModal (props): JSX.Element {

	return (
		<form style={styles.taskModal}>

		</form>
	);
}

const styles: StyleSheet = {
	taskModal: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		textAlign: "center",
		width: "95%",
		maxWidth: "900px",
		height: "95vh",
		maxHeight: "95vh",
		padding: "10px",
		color: textMain
	}
};


export default TaskModal;
