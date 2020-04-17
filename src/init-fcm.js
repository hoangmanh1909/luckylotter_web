import firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  messagingSenderId: "486623418240",
  projectId: "luckylotterapp",
  apiKey: "AIzaSyBoS7fctmMIvObe71i11Pq_ASmZAzT3KQs",
  appId: "1:486623418240:android:e3277ab9e2f64e96665365"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  "BKOQdtXr9EzL8CcNGpDSqWUgc7yI-s2HmkbcRKDENgaqsfgjKRKbRR_zs902_MhKnWbI0uqYb_anf6bu7ar4vTE"
);
export { messaging };