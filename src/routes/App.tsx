import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../../util/useAuth";
import LoginSuccess from "./../LoginSuccess/LoginSuccess";
import Login from "./../Login/Login";


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
