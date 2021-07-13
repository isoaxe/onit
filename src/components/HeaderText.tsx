import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./../util/useAuth";
import { textMain } from "./../util/colours";
import { API_URL } from "./../util/urls";


function HeaderText (): JSX.Element {
	const [role, setRole] = useState(null);
	const auth = useAuth();
	const user = auth.user;

	user.getIdToken(true).then(function (token) {
		const requestOptions = {
			method: "GET",
			headers: { authorization: `Bearer ${token}` }
		};
		fetch(`${API_URL}/role/${user.uid}`, requestOptions)
			.then(res => res.json())
			.then(userRole => setRole(userRole.role));
	}).catch(function (error) {
		console.log(`An error occured whilst fetching user role: ${error}`);
	});

	return (
		<Text>
			Welcome, {user.displayName} | Access level: {role} | Business name here
		</Text>
	);
}

const Text = styled.div`
	font-size: 16px;
	color: ${textMain};
	margin-top: -18px;
`;


export default HeaderText;
