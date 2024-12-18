const firebase = require('@firebase/testing');
global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));

const projectId = "final-4990"; //match your project id (check .firebaserc)
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"; // Ensure this matches your Firestore emulator port

// Initialize Firestore for testing
let db = firebase.initializeTestApp({ projectId }).firestore();

const authDb = firebase.initializeTestApp({ projectId, auth: { uid: "user123" } }).firestore();
const adminDb = firebase.initializeAdminApp({ projectId }).firestore();
/*
beforeAll(async () => {
    // Ensure emulator is running before clearing data
    console.log("Clearing Firestore data...");
    await firebase.clearFirestoreData({ projectId }); // Clear Firestore data for a clean slate
    db = firebase.initializeTestApp({ projectId }).firestore(); // Initialize Firestore app
});*/

test("True", ()=>{
    expect(5).toBe(5);
})
test("unauthorized user cannot write to posts collection", async () => {
  const unauthorizedDb = firebase.initializeTestApp({ projectId }).firestore();
  
  await expect(
    unauthorizedDb.collection("posts").add({ title: "Unauthorized post" })
  ).rejects.toThrow(/PERMISSION_DENIED/); // Expect specific error message
});

/*

  afterAll(async () => {
    await firebase.clearFirestoreData({ projectId });
    await Promise.all(firebase.apps().map(app => app.delete()));
  });*/
  
  