import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useCreateFollowTypedDataMutation } from "../graphql/generated";
import { signTypedDataWithOmmittedTypename, splitSignature } from "./helpers";

export function useFollow() {
  const { mutateAsync: requestTypedData } = useCreateFollowTypedDataMutation();

  const sdk = useSDK();
  const address = useAddress();
  
  async function follow(userId: string) {

   /* 1 Use the auto generated mutation "useCreateFollowTypedData"
   Getting typed Data for user Signin */
  const typedData = await requestTypedData({
    request: { 
      follow: [
        {
          profile: userId,
        },
      ],
     },
  });

  const { domain, types, value,  } = typedData.createFollowTypedData.typedData;

  if (!sdk) return;

  // 2 Ask the User to sign typed Data
  const signature = await signTypedDataWithOmmittedTypename(
    sdk,
    domain,
    types,
    value
  );

  const { v, r, s } = splitSignature(signature.signature);

  const lensHubContract = await sdk.getContractFromAbi(
    LENS_CONTRACT_ADDRESS, 
    LENS_CONTRACT_ABI
  );

  //: Calling Smart Contract "followWithSig" function
  const result = await lensHubContract.call("followWithSig", {
    follower: address,
    profileIds: [userId],
    datas: value.datas,
    sig: {
      v, 
      r, 
      s,
      deadline: value.deadline,
    },
  })

  console.log(result);
  

 }

 /* 3 
 Send typed Data to the Smart Contract perform and write 
 operation on the Blockchain */

 return useMutation(follow);
}