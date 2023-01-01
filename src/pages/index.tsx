import SignInButton from '../components/SignInButton';
import { PublicationSortCriteria, useExplorePublicationsQuery } from '../graphql/generated';
import styles from '../styles/Home.module.css'

// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import { PublicationSortCriteria, useExplorePublicationsQuery } from '../graphql/generated'

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
        <div key={publication.id}>
          <h3>{publication.metadata.name}</h3>
        </div>
      ))}
    </div>
  )
}

