import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./config_firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const getMessagingToken = async () => {
  let currentToken = "";
  try {
    currentToken = await getToken(messaging, {
      vapidKey:
        "BC97_4VZG8y6vxFhMbYYergEQWJs-Z4q3Ela1mXyAFjSt5l-dEesaUJgO8YICRd4sNHRf9vsN7sfmdtsb2Hn1DY",
    });

    console.log("FCM registration token", currentToken);
  } catch (err) {
    //
    console.log(err);
  }

  return currentToken;
};

export const onMessageListener = () => 
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
