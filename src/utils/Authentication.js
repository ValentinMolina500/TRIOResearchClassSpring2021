import Firebase from './Firebase';

class Authentication {

	/* Current user reference */
	currentUser = null;

	authStateObservers = [];

    /* String String -> Promise */
    /* Log in user with email and password */
    login = (email, password) => {
        return Firebase.login(email, password);
    }

    /* Sign out user from session */
    signOut = () => {
        return Firebase.signOut();
    }

    authStateListener = (cb) => {
    	this.authStateObservers.push(cb);
    }

    onAuthStateChanged = () => {
    	this.authStateObservers.forEach((callback) => {
    		callback(this.currentUser);
    	});
    }
}

export const UserRole = {
	REGULAR: "REGULAR",
	ADMIN: "ADMIN"
};

const instance = new Authentication();
export default instance;
