import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
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
        <MediaRenderer
        // @ts-ignore
            src={publication?.profile?.picture?.original?.url || "https://res.cloudinary.com/dwoifuutn/image/upload/v1666343939/chat-dapp-logo_e9wmil.png"}
            alt={publication.profile.name || ""}
            className={styles.feedPostProfilePicture}
          />

        {/* Author Profile Name */}
        <Link 
          href={`/profile/${publication.profile.handle}`}
          className={styles.feedPostProfileName}>
          {publication.profile.name}
        </Link>
      </div>

      <div className={styles.feedPostContent}>
        
        {/* - Name of Author */}
        <h3 className={styles.feedPostContentTitle}>
          {publication.metadata.name}
        </h3>

        {/* Description of Post */}
        <p className={styles.feedPostContentDescription}>
          {publication.metadata.content}
        </p>

        {/* Image | Media if Post is one */}
        {publication.metadata.media?.length > 0 && (
          <MediaRenderer
            src={publication?.metadata?.media[0].original?.url}
            alt={publication.metadata.name || ""}
            className={styles.feedPostContentImage}
          />
        )}
      </div>

      {/* Data of USers Publications */}
      <div className={styles.feedPostFooter}>

        <p className={styles.feedPostContentInfo}>
          {publication.stats.totalAmountOfCollects} Collects
        </p>

        <p className={styles.feedPostContentInfo}>
          {publication.stats.totalAmountOfComments} Comments
        </p>

        <p className={styles.feedPostContentInfo}>
          {publication.stats.totalAmountOfMirrors} Mirrors
        </p>

      </div>
    </div>
  )
}