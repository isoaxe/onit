import { useState, useEffect, useCallback } from "react";
import { primaryMain, secondaryMain, secondaryLight, tertiaryMain, textMain, textAlt } from "./../util/colours";
import LogoutButton from "./../components/LogoutButton";
import HeaderText from "./../components/HeaderText";
import MenuItem from "./../components/MenuItem";
import People from "./../components/People";
import Calendar from "./../components/Calendar";
import TaskModal from "./../components/TaskModal";
import { useAuth } from "./../util/useAuth";
import { getClaims, getBusinessData } from "./../util/helpers";
import { StyleSheet } from "./../util/types";


function Homepage (): JSX.Element {
	const [role, setRole] = useState(null);
	const [userId, setUserId] = useState(null);
	const [businessId, setBusinessId] = useState(null);
	const [businessName, setBusinessName] = useState(null);
	const [menuItem, setMenuItem] = useState("");
	const [taskModalVisible, setTaskModalVisible] = useState(false);
	const [tasks, setTasks] = useState([]);

	const { user } = useAuth();
	const headerName = `Welcome, ${user.displayName}`;
	const headerRole = `Access level: ${role}`;
	const headerBusiness = `Business: ${businessName}`;
	const headerBusinessId = `Business ID: ${businessId}`;

	const fetchClaims = useCallback(
		async () => {
			const claims = await getClaims(user);
			if (claims) {
				setRole(claims.role);
				setBusinessId(claims.businessId);
			}
		}, [user]
	);

	const fetchBusinessData = useCallback(
		async () => {
			const data = await getBusinessData(user, businessId);
			if (data) {
				setBusinessName(data.displayName);
			}
		}, [user, businessId]
	);

	useEffect(() => {
		if (user) {
			fetchClaims();
			setUserId(user.uid);
		}
		if (user && businessId) {
			fetchBusinessData();
		}
	}, [user, businessId, fetchClaims, fetchBusinessData]);

	useEffect(() => {
		if (role === "staff") {
			setMenuItem("calendar");
		}
	}, [role]);

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
			color: textMain,
		},
		wrapper: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			width: "95%",
			maxWidth: "1200px",
			minHeight: "inherit",
			padding: "10px",
			border: `2px ${secondaryMain} solid`,
			borderRadius: "10px",
		},
		header: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			width: "100%",
		},
		menuWrapper: {
			display: "flex",
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			width: "100%",
			maxWidth: "1100px",
		},
		menuItems: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "flex-start",
		},
		menuContent: {
			marginTop: "10px",
			marginLeft: "10px",
			padding: "10px",
			background: menuItem === "calendar" ? secondaryLight : "inherit",
			border: `2px ${tertiaryMain} solid`,
			borderRadius: "10px",
			width: menuItem === "calendar" ? "100%" : "auto",
			color: textAlt,
		},
		noMenuItemText: {
			opacity: "40%",
			fontWeight: "normal",
			color: textMain,
		}
	};

	return (
		<div style={styles.root}>
			<div style={styles.wrapper}>
				<header style={styles.header}>
					<HeaderText text={headerName} />
					<HeaderText text={headerRole} />
					{role !== "owner" &&
						<HeaderText text={headerBusiness} />}
					{role === "owner" &&
						<HeaderText text={headerBusinessId} />}
					<LogoutButton />
				</header>
				<section style={styles.menuWrapper}>
					<div style={styles.menuItems}>
						{(role === "owner" || role === "manager") &&
							<MenuItem
								active={menuItem}
								label="People"
								onClick={() => setMenuItem("people")}
							/>}
						<MenuItem
							active={menuItem}
							label="Calendar"
							onClick={() => setMenuItem("calendar")}
						/>
					</div>
					<div style={styles.menuContent}>
						{!menuItem &&
							<h3 style={styles.noMenuItemText}>Select an action from the menu items on the left</h3>}
						{menuItem === "people" &&
							<People businessId={businessId} role={role} />}
						{menuItem === "calendar" &&
							<Calendar
								setTaskModalVisible={setTaskModalVisible}
								userId={userId}
								businessId={businessId}
								tasks={tasks}
								setTasks={setTasks}
								role={role}
							/>}
						{role !== "staff" &&
							<TaskModal
								taskModalVisible={taskModalVisible}
								setTaskModalVisible={setTaskModalVisible}
								userId={userId}
								businessId={businessId}
								role={role}
								tasks={tasks}
								setTasks={setTasks}
							/>}
					</div>
				</section>
			</div>
		</div>
	);
}


export default Homepage;
