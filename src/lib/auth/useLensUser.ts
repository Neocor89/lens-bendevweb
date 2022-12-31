import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "../../graphql/generated";

export default function useLensUser() {
  //: 1 Make a react query for Local storage key
  const address = useAddress();

  const localStorageQuery = useQuery(
    //: Cache key and Key 
    ["lens-user", address],
    //: Function to check the local storage
    () => readAccessToken()
  );

  //: Waiting address for launch function profile
  const profileQuery = useDefaultProfileQuery({
    request: {
      ethereumAddress: address,
    }
  },
  {
    enabled: !!address,
  }
  );

  //: console.log(profileQuery.data?.defaultProfile);
  

  return {
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  };
};