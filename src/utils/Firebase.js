import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from './Authentication';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();

        console.log('Firebase init!');
    }

    /* String String -> UserCredential */
    /* log in user via Firebase */
    login = async (email, password) => {
        const user = await this.auth.signInWithEmailAndPassword(email, password);
        const userInfoRef = await this.db.ref(`/users/${user.user.uid}`).once('value');
        const userInfo = userInfoRef.val();

        return Promise.resolve({ currentUser: user, userInfo });
    }

    signOut = () => {
        return this.auth.signOut();
    }

    signUp = async (email, password, userInfo) => {

      /* Create the user using FB Auth */
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

      /* Handle case if user creation failed */
      if (!userCredential.user) {
        throw Error("Could not create user!");
      }

      /* Get reference to user */
      const user = userCredential.user;
      
      /* Add user info into database */
      await this.db.ref(`/users/${user.uid}`).set({ ...userInfo, uid: user.uid, vaccinated: false, role: UserRole.REGULAR });
    }

    getCurrentUser = () => {
      return this.auth.currentUser;
    }

    uploadForm = async (form, uid) => {
        const fileObj = form.file[0];
        const uniqueFilename = uuidv4();

        const fileRef = this.storage.ref(`/recordImages/${uniqueFilename}`);
        await fileRef.put(fileObj);

        const url = await fileRef.getDownloadURL();

        /* Save image url to form */
        const timestamp = new Date().getTime();
        const { file, ...other } = form;

        const result = await this.db.ref(`/forms/`).push({ ...other, image: url, timestamp, uid, updatedAt: timestamp });

        console.log(result);
        /* Add key to users list of forms */   
        await this.db.ref(`/forms/${result.key}/key`).set(result.key);
        await this.db.ref(`/users/${uid}/forms/`).push({ key: result.key });

        console.log(result);
    }

    getForms = async (uid) => {
        const formObj = await this.db.ref(`/users/${uid}/forms`).once('value');

        console.log(formObj.val());
        if (!formObj.val()) {
          return [];
        }
        
        const forms = await Promise.all( Object.keys(formObj.val()).map((key) => {
            const formKey = formObj.val()[key].key;
            return this.db.ref(`/forms/${formKey}`).once('value').then(result => { return { ...result.val(), key: formKey }});
        }));
          
        return forms.reverse();
    }

    logout = () => {
      return this.auth.signOut();
    }

    getFormById = (id) => {
      return this.db.ref(`/forms/${id}`).once('value');
    }

    getAllForms = async () => {
      const formObj = await this.db.ref(`/forms/`).once('value');
     
      if (!formObj.val()) {
        return [];
      }
     
      const forms = Object.keys(formObj.val()).map(key => {
        return { ...formObj.val()[key], key }
      });
     
      console.log(forms);
      return forms.reverse();
    }

    updateFormStatus =  (status, formId) => {
      const updatedAt = new Date().getTime();
      let updates = {};
      updates[`/forms/${formId}/status`] = status;
      updates[`/forms/${formId}/updatedAt`] = updatedAt;

      return this.db.ref().update(updates);
    }

    getUserById = (id) => {
      return this.db.ref(`/users/${id}`).once('value');
    }
}

const singleton = new Firebase();
export default singleton;
