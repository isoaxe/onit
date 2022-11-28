import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

function PhoneNumber(props: PhoneInputProps): JSX.Element {
  const { name, value, onChange } = props;

  return (
    <PhoneInput
      placeholder="Phone number"
      international
      defaultCountry="TH"
      name={name}
      value={value}
      onChange={onChange}
      style={phoneInputStyles}
    />
  );
}

export default PhoneNumber;
