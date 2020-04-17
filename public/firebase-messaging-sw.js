importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  messagingSenderId: "486623418240",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
        console.log("windowClients",payload);
    })
    .then((message) => {
      console.log(message);
      console.log("message", payload);

       const notificationTitle = payload.data.title;
       const notificationOptions = {
         body: payload.data.message,
         icon: "./logo.png",
       };

       return registration.showNotification(
         notificationTitle,
         notificationOptions
       );
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  // console.log("event", event);
  clients.openWindow("/");
  // window.location.href = "http://localhost:8000/";
  // do what you want
  // ...
});

// messaging.onMessage((payload) => {
//   console.log("Message received. ", payload);
//   // ...
// });
