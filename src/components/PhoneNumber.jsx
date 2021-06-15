import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


function PhoneNumber (props) {

	return (
		<PhoneInput
			placeholder="Phone number"
			international
			defaultCountry="TH"
			name={props.name}
			value={props.value}
			onChange={props.onChange} />
	);
}


export default PhoneNumber;
