import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import LoginSuccess from "./../pages/LoginSuccess";
import Login from "./../pages/Login";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<Route path="/loginsuccess">
						<LoginSuccess />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	);
}

export default App;
