import { ChainId, ConnectWallet, useAddress, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import React from 'react'

type Props = {}

export default function SignInButton({}: Props) {
  const address = useAddress(); //: Detected connected Address
  const isOnWrongNetwork = useNetworkMismatch(); //: Detect if user is on wrong network 
  const [, switchNetwork] = useNetwork(); //: 2. Function to switch network

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
  //: 4. SHow the user their profile on Lens
  return (
    <div>SignInButton</div>
  )
}