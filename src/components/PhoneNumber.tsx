import { useEffect } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import { muiBlur, muiError, muiFocus } from "../util/colours";
import { COUNTRY_CODE } from "../util/constants";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

type PhoneNumberProps = PhoneInputProps & { helperText: string };

function PhoneNumber(props: PhoneNumberProps): JSX.Element {
  const { name, value, onChange, helperText } = props;

  const displayStyle = helperText ? "inline" : "none";
  const phoneHelperTextStyle = {
    display: displayStyle,
    fontSize: "12px",
    color: "#d32f2f",
    margin: "-12px 10px 22px",
  };

  useEffect(() => {
    const input = document.getElementsByClassName(
      "PhoneInputInput"
    )[0] as HTMLElement;
    const inFocus = document.getElementsByClassName(
      "PhoneInput--focus"
    )[0] as HTMLElement;

    if (helperText) {
      input.style.outlineColor = muiError;
    } else if (inFocus) {
      input.style.outlineColor = muiFocus;
    } else {
      input.style.outlineColor = muiBlur;
    }
  });

  return (
    <div className="phone-wrapper">
      <PhoneInput
        placeholder="Phone Number"
        international
        defaultCountry={COUNTRY_CODE}
        name={name}
        value={value}
        onChange={onChange}
        style={phoneInputStyles}
      />
      <p style={phoneHelperTextStyle}>{helperText}</p>
    </div>
  );
}

export default PhoneNumber;
