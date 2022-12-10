import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import RestrictedRoute from "../routes/RestrictedRoute";
import Homepage from "../pages/Homepage";
import LoginSignup from "../pages/LoginSignup";
import { ProvideAuth } from "../util/useAuth";
import { secondaryMain, secondaryLight, textMain } from "../util/colours";

function App(): JSX.Element {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.title = "Onit";
  }, []);

  return (
    <div>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Switch>
            <RestrictedRoute path="/home" setShowAlert={setShowAlert}>
              <Homepage />
            </RestrictedRoute>
            <Route path="/">
              <LoginSignup showAlert={showAlert} />
            </Route>
          </Switch>
        </ThemeProvider>
      </ProvideAuth>
    </div>
  );
}

export default App;

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryMain,
          "&:hover": {
            backgroundColor: secondaryLight,
          },
          color: textMain,
          textTransform: "none",
        },
      },
    },
  },
});
