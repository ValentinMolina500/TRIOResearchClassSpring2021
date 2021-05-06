import Firebase from "./Firebase";

class Authentication {
  /* Current user reference */
  authInfo = {
    currentUser: null,
    newUser: false,
    userInfo: null,
  };

  authStateObservers = [];

  /* Log in user with email and password */
  login = async (email, password) => {
    try {
      const result = await Firebase.login(email, password);
      console.log(result);
      const { currentUser, userInfo } = result;

      this.authInfo = {
        ...this.authInfo,
        currentUser,
        userInfo,
      };

      /* Notify observers */
      this._onAuthStateChanged();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  /* Sign out user from session */
  signOut = () => {
    return Firebase.signOut();
  };

  signUp = async (email, password, userInfo) => {
    await Firebase.signUp(email, password, userInfo);

    /* Set local auth info */
    this.authInfo.currentUser = Firebase.getCurrentUser();
    this.authInfo.userInfo = {
      ...userInfo,
      uid: this.authInfo.currentUser.uid,
      role: UserRole.REGULAR
    };
    this.authInfo.newUser = true;

    this._onAuthStateChanged();
  };

  onAuthStateChanged = (cb) => {
    this.authStateObservers.push(cb);
  };

  _onAuthStateChanged = () => {
    this.authStateObservers.forEach((callback) => {
      callback(this.authInfo);
    });
  };

  isLoggedIn = () => {
    return this.authInfo.currentUser !== null;
  };

  getCurrentUser = () => {
    return this.authInfo.userInfo;
  };

  logout = async () => {
    await Firebase.logout();

    this.authInfo = {
      currentUser: null,
      newUser: false,
      userInfo: null,
    };
  };
}

export const UserRole = {
  REGULAR: "REGULAR",
  ADMIN: "ADMIN",
};

const instance = new Authentication();
export default instance;
