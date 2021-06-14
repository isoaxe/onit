import styled from "styled-components";


function SignUpButton (props): JSX.Element {
	return (
		<Wrapper>
			<Button onClick={props.onClick}>
				{props.label}
			</Button>
		</Wrapper>
	);
}

const Button = styled.div`
	background-color: #3F524C;
	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	text-align: center;
	font-size: 14px;
	padding: 10px;
	margin-bottom: 12px;
`;

const Wrapper = styled.div`
	&:hover ${Button} {
		background-color: #4A615A;
		cursor: pointer;
	}
`;


export default SignUpButton;
