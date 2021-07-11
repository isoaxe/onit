import styled from "styled-components";
import { secondaryMain, secondaryLight, buttonShadow } from "./../util/colours";


function MenuItem (): JSX.Element {

	return (
		<Item>
			Placeholder
		</Item>
	);
}

const Item = styled.div`
	background-color: ${secondaryMain};
	box-shadow: ${buttonShadow};
	border-radius: 4px;
	text-align: left;
	font-size: 14px;
	width: 70px;
	padding: 10px;
	margin-bottom: 10px;
	&:hover {
		background-color: ${secondaryLight};
		cursor: pointer;
	}
`;


export default MenuItem;
