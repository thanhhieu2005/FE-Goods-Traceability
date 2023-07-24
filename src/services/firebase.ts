import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { firebaseConfig } from "./config_firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// const vapidKey = process.env.firebase_key;

// console.log(vapidKey);

export const getMessagingToken = async () => {
  let currentToken = "";
  try {
    currentToken = await getToken(messaging, {
      vapidKey: "BBKjAF_MAM-_j1KK0Mt4uG2TTTUxKy26QHMsWwffS6sUXuZ-jdxGIkgK6V7xPmfDwwh-d-6q9s6UIzlWFTvnrpc",
    });
    
  } catch (err) {
    //
    console.log(err);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Here it Call and send");
      console.log(payload);
      resolve(payload);
    });
  });
