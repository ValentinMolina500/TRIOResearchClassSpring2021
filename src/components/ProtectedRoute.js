import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authentication from "../utils/Authentication";

function ProtectedRoute({ children, ...rest }) {
	return (
		<Route {...rest} render={(props) => {
			return Authentication.isLoggedIn() ? React.cloneElement(children, Object.assign({}, props)) : <Redirect to="/" />
		}} />
	);
}

export default ProtectedRoute;