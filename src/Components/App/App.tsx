import { Route, Switch } from "react-router-dom";

import LoginSuccess from "./../LoginSuccess/LoginSuccess";
import Login from "./../Login/Login";


function App (): JSX.Element {
	return (
		<div>
			<Switch>
				<Route path="/loggedin">
					<LoginSuccess />
				</Route>
				<Route path="/">
					<Login />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
