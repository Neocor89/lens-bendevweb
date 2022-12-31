import { ChainId, ConnectWallet, useAddress, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import React from 'react'
import useLensUser from '../lib/auth/useLensUser';
import useLogin from '../lib/auth/useLogin';

type Props = {}

export default function SignInButton({}: Props) {
  const address = useAddress(); //: Detected connected Address
  const isOnWrongNetwork = useNetworkMismatch(); //: Detect if user is on wrong network 
  const [, switchNetwork] = useNetwork(); //: 2. Function to switch network
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

    //: 1. User needs to connect their wallet
    if (!address) {
      return <ConnectWallet />
    }

    //: 2. User needs to switch network to Polygon
    if (isOnWrongNetwork) {
      return (
        <button 
          onClick={() => switchNetwork?.(ChainId.Polygon)}
        >
          Switch Network
        </button>
      );
    }

    
    //: 3. SignIn with Lens
    if (isSignedInQuery.isLoading) {
      return <div>Loading...</div>
      }


      //: Check User is Signed in we need to request login
      if (!isSignedInQuery.data) {
        return  <button onClick={() => requestLogin()}>
                  Sign in with Lens
                </button>
      };


      //: 4. Loading their profile Information on Lens
      if (profileQuery.isLoading) { 
        return <div>Loading...</div>  
      }

      //: Done Loading and not default profile
      if (!profileQuery.data?.defaultProfile) {
        return <div>No Lens profile</div>
      }

      //: Done Loading with Lens default profile
      if (profileQuery.data?.defaultProfile) {
        return <div>Hello {profileQuery.data?.defaultProfile?.handle}</div>
      }

      return (
        <div>
          Something went wrong...
        </div>
      );
}