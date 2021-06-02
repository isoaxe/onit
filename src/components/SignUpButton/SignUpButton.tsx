import "./SignUpButton.css";


function SignUpButton (props): JSX.Element {
	return (
		<div className="SignUp" onClick={props.onClick}>
			{props.label}
		</div>
	);
}

export default SignUpButton;
