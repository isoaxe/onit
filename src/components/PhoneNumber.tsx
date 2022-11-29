import { useEffect } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import { textError } from "../util/colours";
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
    const inFocus = document.getElementsByClassName(
      "PhoneInput--focus"
    )[0] as HTMLElement;

    if (helperText) {
      input.style.outlineColor = textError;
    } else if (inFocus) {
      input.style.outlineColor = "#3b74cb";
    } else {
      input.style.outlineColor = "#31353d";
    }
  });

  return (
    <PhoneInput
      placeholder="Phone Number"
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
