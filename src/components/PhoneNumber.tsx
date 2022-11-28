import { useEffect } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import { inputError } from "../util/colours";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

type PhoneNumberProps = PhoneInputProps & { helperText: string };

function PhoneNumber(props: PhoneNumberProps): JSX.Element {
  const { name, value, onChange, helperText } = props;

  useEffect(() => {
    const input = document.getElementsByClassName(
      "PhoneInputInput"
    )[0] as HTMLElement;

    if (helperText) {
      input.style.outline = inputError;
    } else {
      input.style.outline = "1px solid #31353d";
    }
  });

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
