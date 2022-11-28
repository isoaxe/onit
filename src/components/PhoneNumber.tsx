import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

type PhoneNumberProps = PhoneInputProps & { helperText: string };

function PhoneNumber(props: PhoneNumberProps): JSX.Element {
  const { name, value, onChange, helperText } = props;

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
