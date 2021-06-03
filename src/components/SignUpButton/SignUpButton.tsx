import "./SignUpButton.css";


function SignUpButton (props): JSX.Element {
	return (
		<div className="sign-up" onClick={props.onClick}>
			{props.label}
		</div>
	);
}

export default SignUpButton;
