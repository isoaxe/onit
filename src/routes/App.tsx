import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import RestrictedRoute from "./../routes/RestrictedRoute";
import Homepage from "./../pages/Homepage";
import LoginSignup from "./../pages/LoginSignup";


function App (): JSX.Element {

	useEffect(() => {
		document.title = "Onit";
	}, []);

	return (
		<div>
			<ProvideAuth>
				<Switch>
					<RestrictedRoute path="/home">
						<Homepage />
					</RestrictedRoute>
					<Route path="/">
						<LoginSignup />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	);
}

export default App;
