import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

function PhoneNumber(props: PhoneInputProps): JSX.Element {
  return (
    <PhoneInput
      placeholder="Phone number"
      international
      defaultCountry="TH"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      style={phoneInputStyles}
    />
  );
}

export default PhoneNumber;
