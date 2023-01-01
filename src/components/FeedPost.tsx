import React from 'react'
import { ExplorePublicationsQuery } from '../graphql/generated';
import styles from "../styles/FeedPost.module.css";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

export default function FeedPost({publication}: Props) {
  return (
    <div className={styles.feedPostContainer}>
      <div className={styles.feedPostHeader}>
        {/* Author Profile Picture */}

        {/* Author Profile Name */}
      </div>

      <div className={styles.feedPostContent}>
        {/* Name of Author */}

        {/* Description of Post */}

        {/* Image | Media if Post is one */}
      </div>
    </div>
    // {publication.metadata.name}
  )
}