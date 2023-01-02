import FeedPost from '../components/FeedPost';
import { PublicationSortCriteria, useExplorePublicationsQuery } from '../graphql/generated';
import styles from '../styles/Home.module.css';
import { MediaRenderer } from "@thirdweb-dev/react";
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //+ Lens profile bendevweb89.test

  const { isLoading, error, data } = useExplorePublicationsQuery({
    request: {
      sortCriteria: PublicationSortCriteria.TopCollected,
    }
  });

  if (error) {
    return(
      <div className={styles.container}>Error...</div>
    )
  }

  if (isLoading) {
    return(
      <div className={styles.container}>Loading...</div>
    )
  }

  return (
    <div className={styles.container}>
      {data?.explorePublications.items.map((publication) => (
        <FeedPost 
          key={publication.id} 
          publication={publication} 
        />
      ))}
    </div>
  )
}

