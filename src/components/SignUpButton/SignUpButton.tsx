import "./SignUpButton.css";


function SignUpButton (props): JSX.Element {
	return (
		<div className="SignUp">
			{props.label}
		</div>
	);
}

export default SignUpButton;
