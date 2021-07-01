import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import RestrictedRoute from "./../routes/RestrictedRoute";
import LoginSuccess from "./../pages/LoginSuccess";
import Login from "./../pages/Login";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<RestrictedRoute path="/loginsuccess">
						<LoginSuccess />
					</RestrictedRoute>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	);
}

export default App;
