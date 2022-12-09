import { useState, useEffect, ChangeEvent } from "react";
import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import { FormHelperText, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyleSheet } from "../util/types";

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { password, setPassword } = props;
  const { passwordHelperText, setPasswordHelperText } = props;

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  // Display password validation in DOM as user types.
  useEffect(() => {
    if (password && password.length < 8) {
      setPasswordHelperText("Needs to be > 7 characters");
    } else {
      setPasswordHelperText("");
    }
  }, [password]);

  return (
    <FormControl sx={styles.inputField}>
      <InputLabel htmlFor="password-field" error={!!passwordHelperText}>
        Password
      </InputLabel>
      <OutlinedInput
        id="password-field"
        label="Password"
        value={password}
        type={showPassword ? "text" : "password"}
        onChange={handlePassword}
        error={!!passwordHelperText}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={!!passwordHelperText}>
        {passwordHelperText}
      </FormHelperText>
    </FormControl>
  );
}

export default PasswordField;

const styles: StyleSheet = {
  inputField: {
    width: "80%",
    marginBottom: "15px",
  },
};
