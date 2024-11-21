const firebase = require("@firebase/testing");

const projectId = "mizzou-demoblog"; // Match your project ID
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

async function runTest() {
  try {
    const unauthorizedDb = firebase.initializeTestApp({ projectId }).firestore();

    await unauthorizedDb.collection("posts").add({ title: "Unauthorized post" });
  } catch (error) {
    console.error("Expected error:", error.message);
  }
}

runTest();
