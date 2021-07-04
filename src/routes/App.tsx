import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import RestrictedRoute from "./../routes/RestrictedRoute";
import LoginSuccess from "./../pages/LoginSuccess";
import LoginSignup from "./../pages/LoginSignup";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<RestrictedRoute path="/loginsuccess">
						<LoginSuccess />
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
