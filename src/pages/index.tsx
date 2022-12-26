// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import { PublicationSortCriteria, useExplorePublicationsQuery } from '../graphql/generated'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const {data, isLoading, error} = useExplorePublicationsQuery({
      request: {
        sortCriteria: PublicationSortCriteria.TopMirrored,
      }
    });

  console.log({
    data,
    isLoading,
    error,
  });
  


  return (
    <>
     <h1>Hello World!</h1>
    </>
  )
}
