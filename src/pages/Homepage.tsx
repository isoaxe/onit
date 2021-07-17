import { useState, useEffect } from "react";
import { primaryMain, secondaryMain, textMain } from "./../util/colours";
import LogoutButton from "./../components/LogoutButton";
import HeaderText from "./../components/HeaderText";
import MenuItem from "./../components/MenuItem";
import { useAuth } from "./../util/useAuth";
import { getClaims, getBusinessData } from "./../util/helpers";
import { StyleSheet } from "./../util/types";


function Homepage (): JSX.Element {
	const [role, setRole] = useState(null);
	const [businessId, setBusinessId] = useState(null);
	const [businessName, setBusinessName] = useState(null);

	const auth = useAuth();
	const user = auth.user;
	const headerName = `Welcome, ${user.displayName}`;
	const headerRole = `Access level: ${role}`;
	const headerBusiness = `Business name here: ${businessName}`;

	async function fetchClaims () {
		const claims = await getClaims(user);
		setRole(claims.role);
		setBusinessId(claims.businessId);
	}

	async function fetchBusinessData () {
		const data = await getBusinessData(user, businessId);
		if (data) {
			setBusinessName(data.address1);
		}
	}

	function people () {
		return true;
	}

	function tasks () {
		return true;
	}

	function calendar () {
		return true;
	}

	useEffect(() => {
		fetchClaims();
		if (user && businessId) {
			fetchBusinessData();
		}
	});

	return (
		<div style={styles.root}>
			<div style={styles.wrapper}>
				<header style={styles.header}>
					<HeaderText text={headerName} />
					<HeaderText text={headerRole} />
					{role !== "company" && <HeaderText text={headerBusiness} />}
					<LogoutButton />
				</header>
				<section style={styles.section}>
					<MenuItem label="People" onClick={people} />
					<MenuItem label="Tasks" onClick={tasks} />
					<MenuItem label="Calendar" onClick={calendar} />
				</section>
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
		alignItems: "flex-start",
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
		justifyContent: "space-between",
		width: "100%"
	},
	section: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start"
	}
};


export default Homepage;
