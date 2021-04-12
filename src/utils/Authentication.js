import Firebase from './Firebase';

class Authentication {

    /* String String -> Promise */
    /* Log in user with email and password */
    login = (email, password) => {
        return Firebase.login(email, password);
    }

    /* Sign out user from session */
    signOut = () => {
        return Firebase.signOut();
    }
}

const instance = new Authentication();

export default instance;
