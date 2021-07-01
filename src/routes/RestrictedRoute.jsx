import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./../util/useAuth";


// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function RestrictedRoute ({ children, ...rest }) {
	let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

export default RestrictedRoute;
