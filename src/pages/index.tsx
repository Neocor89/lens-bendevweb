import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import useLogin from '../lib/auth/useLogin';
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
// import { PublicationSortCriteria, useExplorePublicationsQuery } from '../graphql/generated'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const address = useAddress();
  const { mutate: requestLogin } = useLogin();

  if (!address) {
    return <ConnectWallet />
  }
  
  return <button onClick={() => requestLogin()}>Login</button>
}
