import { Route } from "react-router-dom";
import Authentication from "./../../util/auth";
import LoginSuccess from "./../LoginSuccess/LoginSuccess";
import "./App.css";


function App (): JSX.Element {
	return (
		<div className="App">
			<header className="App-header">
				<p>
          Choose your preferred login method.
				</p>
				<div id="firebaseui-auth-container"></div>
				<Authentication />
			</header>
			<div>
				<Route path="/loggedin" component={LoginSuccess} />
			</div>
		</div>
	);
}

export default App;
