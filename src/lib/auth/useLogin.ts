//: 0 Verification if user has connected wallet


//: 3 Send the signed challenge the Lens API
//: 4 Receive a access token from the Lens API if we succeed
//: 5 Store the access token inside local storage so we can use it

import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();

  async function login() {
    if (!address) return;

    //: 1 Generate challenge wich comes from the Lens API
    const { challenge } = await generateChallenge(address);

    /* 
     : 2 Sign the challenge with the user wallet 
     : (Use of return value = challenge.text) 
     : for wanted to user of signin the message) 
     */

    const signature = await sdk?.wallet.sign(challenge.text);
  }
}