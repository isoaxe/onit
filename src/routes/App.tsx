import { Route, Switch } from "react-router-dom";

import { ProvideAuth } from "./../util/useAuth";
import LoginSuccess from "./../pages/LoginSuccess/LoginSuccess";
import LoginWrapper from "./../pages/LoginWrapper/LoginWrapper";


function App (): JSX.Element {
	return (
		<div>
			<ProvideAuth>
				<Switch>
					<Route path="/loginsuccess">
						<LoginSuccess />
					</Route>
					<Route path="/">
						<LoginWrapper />
					</Route>
				</Switch>
			</ProvideAuth>
		</div>
	);
}

export default App;
