import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import LoginSuccess from "./../pages/LoginSuccess/LoginSuccess";
import Login from "./../pages/Login/Login";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<Route path="/loggedin">
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
