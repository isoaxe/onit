import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import LoginRoute from "./../routes/LoginRoute";
import LoginSuccess from "./../pages/LoginSuccess";
import Login from "./../pages/Login";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<LoginRoute path="/loginsuccess">
						<LoginSuccess />
					</LoginRoute>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	);
}

export default App;
