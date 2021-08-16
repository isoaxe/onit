import { useState, useEffect } from "react";
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
	const [businessId, setBusinessId] = useState(null);
	const [businessName, setBusinessName] = useState(null);
	const [menuItemSelected, setMenuItemSelected] = useState(false);
	const [peopleActive, setPeopleActive] = useState(false);
	const [tasksActive, setTasksActive] = useState(false);
	const [calendarActive, setCalendarActive] = useState(false);
	const [taskModalVisible, setTaskModalVisible] = useState(false);

	const { user } = useAuth();
	const headerName = `Welcome, ${user.displayName}`;
	const headerRole = `Access level: ${role}`;
	const headerBusiness = `Business: ${businessName}`;
	const headerBusinessId = `Business ID: ${businessId}`;

	async function fetchClaims () {
		const claims = await getClaims(user);
		if (claims) {
			setRole(claims.role);
			setBusinessId(claims.businessId);
		}
	}

	async function fetchBusinessData () {
		const data = await getBusinessData(user, businessId);
		if (data) {
			setBusinessName(data.displayName);
		}
	}

	function people () {
		setMenuItemSelected(true);
		setTasksActive(false);
		setCalendarActive(false);
		setPeopleActive(true);
	}

	function tasks () {
		setMenuItemSelected(true);
		setPeopleActive(false);
		setCalendarActive(false);
		setTasksActive(true);
	}

	function calendar () {
		setMenuItemSelected(true);
		setPeopleActive(false);
		setTasksActive(false);
		setCalendarActive(true);
	}

	useEffect(() => {
		if (user) {
			fetchClaims();
		}
		if (user && businessId) {
			fetchBusinessData();
		}
	});

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
			background: calendarActive ? secondaryLight : "inherit",
			border: `2px ${tertiaryMain} solid`,
			borderRadius: "10px",
			width: calendarActive ? "100%" : "auto",
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
					{role !== "owner" && <HeaderText text={headerBusiness} />}
					{role === "owner" && <HeaderText text={headerBusinessId} />}
					<LogoutButton />
				</header>
				<section style={styles.menuWrapper}>
					<div style={styles.menuItems}>
						{(role === "owner" || role === "manager") && <MenuItem label="People" onClick={people} />}
						<MenuItem label="Tasks" onClick={tasks} />
						<MenuItem label="Calendar" onClick={calendar} />
					</div>
					<div style={styles.menuContent}>
						{!menuItemSelected && <h3 style={styles.noMenuItemText}>Select an action from the menu items on the left</h3>}
						{peopleActive && <People businessId={businessId} role={role} />}
						{tasksActive && <h3>Tasks Placeholder</h3>}
						{calendarActive && <Calendar setTaskModalVisible={setTaskModalVisible}/>}
						{taskModalVisible && <TaskModal />}
					</div>
				</section>
			</div>
		</div>
	);
}


export default Homepage;
