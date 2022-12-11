import { useState, useEffect, useCallback } from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-number-input";
import { muiBlur, muiError, muiFocus, muiHover } from "../util/colours";
import { COUNTRY_CODE } from "../util/constants";
import "react-phone-number-input/style.css";
import "./css/PhoneNumber.css";

const phoneInputStyles = { width: "79%", marginBottom: "15px" };

type PhoneNumberProps = PhoneInputProps & { helperText: string };

function PhoneNumber(props: PhoneNumberProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inFocus, setInFocus] = useState(false);

  const { name, value, onChange, helperText } = props;

  const input = document.getElementsByClassName(
    "PhoneInputInput"
  )[0] as HTMLElement;

  const displayStyle = helperText ? "inline" : "none";
  const phoneHelperTextStyle = {
    display: displayStyle,
    fontSize: "12px",
    color: muiError,
    margin: "-12px 10px 22px",
  };

  function setErrorOutline() {
    input.style.outlineColor = muiError;
  }

  function setFocusedOutline() {
    input.style.outlineColor = muiFocus;
    setInFocus(true);
  }

  function setHoveringOutline() {
    input.style.outlineColor = muiHover;
  }

  function setBlurredOutline() {
    input.style.outlineColor = muiBlur;
    setInFocus(false);
  }

  const setOutline = useCallback(() => {
    if (helperText) {
      setErrorOutline();
    } else if (inFocus) {
      setFocusedOutline();
    } else {
      setBlurredOutline();
    }
    // We don't need setters in the dependency array, so disable eslint check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helperText, inFocus]);

  useEffect(() => {
    if (!isLoaded) {
      // If page is not loaded, the outline setters can't fetch input.
    } else {
      setOutline();
    }
    setIsLoaded(true);
  }, [isLoaded, setOutline]);

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
        onFocus={setFocusedOutline}
        onMouseEnter={setHoveringOutline}
        onMouseLeave={setOutline}
        onBlur={setBlurredOutline}
      />
      <p style={phoneHelperTextStyle}>{helperText}</p>
    </div>
  );
}

export default PhoneNumber;
