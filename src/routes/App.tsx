import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import RestrictedRoute from "../routes/RestrictedRoute";
import Homepage from "../pages/Homepage";
import LoginSignup from "../pages/LoginSignup";
import { ProvideAuth } from "../util/useAuth";
import { secondaryMain, secondaryLight, textMain } from "../util/colours";

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

function App(): JSX.Element {
  useEffect(() => {
    document.title = "Onit";
  }, []);

  return (
    <div>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Switch>
            <RestrictedRoute path="/home">
              <Homepage />
            </RestrictedRoute>
            <Route path="/">
              <LoginSignup />
            </Route>
          </Switch>
        </ThemeProvider>
      </ProvideAuth>
    </div>
  );
}

export default App;
