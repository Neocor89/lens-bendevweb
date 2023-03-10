import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  //: ChainId want to be running to Polygon Mumbai Testenet
  const desiredChainId = ChainId.Polygon;

//: Creation of client
const queryClient = new QueryClient();

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <QueryClientProvider client={queryClient}>
        <Header />
      <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  )
}
