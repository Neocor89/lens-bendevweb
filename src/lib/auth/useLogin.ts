import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useAuthenticateMutation } from "../../graphql/generated";
import generateChallenge from "./generateChallenge";
//: 0 Verification if user has connected wallet

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();
  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();

  async function login() {
    if (!address) return;

    //: 1 Generate challenge wich comes from the Lens API
    const { challenge } = await generateChallenge(address);

    /* 
     : 2 Sign the challenge message signature
     : with the user wallet 
     : (Use of return value = challenge.text) 
     : for wanted to user of signin the message) 
     */
    const signature = await sdk?.wallet.sign(challenge.text);

    //: 3 Send the signed challenge the Lens API
    const { authenticate } = await sendSignedMessage({
      request: {
        address,
        signature,
      }
    });

    //: 4 Receive a access token from the Lens API if we succeed
    //: 5 Store the access token inside local storage so we can use it
  }

  return useMutation(login);

}