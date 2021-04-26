import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
	return (
		<Route {...rest} render={(props) => {
			return true ? React.cloneElement(children, Object.assign({}, props)) : <Redirect to="/" />
		}} />
	);
}

export default ProtectedRoute;