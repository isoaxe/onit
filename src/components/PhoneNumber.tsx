import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

function PhoneNumber(props: PhoneInputProps): JSX.Element {
  return (
    <PhoneInput
      placeholder="Phone number"
      international
      defaultCountry="TH"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      style={{ width: "82%" }}
    />
  );
}

export default PhoneNumber;
