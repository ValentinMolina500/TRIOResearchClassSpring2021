const functions = require("firebase-functions");
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const Status = {
  NEEDS_REVIEW: "NEEDS_REVIEW",
  VALID: "VALID",
  REJECT: "REJECT"
}

/**
 * Set forms owner's vaccinated flag on new form. 
 */
exports.updateVacStatus = functions.database.ref('/forms/{formId}')
  .onWrite((snapshot, context) => {
    const { status, ownerId } = snapshot.val();

    const isVac = false;
    if (status === Status.VALID) {
      isVac = true;
    }

    return admin.database().ref(`/users/${ownerId}/vaccinated`).set(isVac);
  });