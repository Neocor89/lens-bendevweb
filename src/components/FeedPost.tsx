import { MediaRenderer } from "@thirdweb-dev/react";
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
            alt={publication.profile.name || publication.profile.handle}
            className={styles.feedPostProfilePicture}
          />

        {/* Author Profile Name */}
        <p className={styles.feedPostProfileName}>
          {publication.profile.name || publication.profile.handle}
        </p>
      </div>

      <div className={styles.feedPostContent}>
        {/* Name of Author */}

        {/* Description of Post */}

        {/* Image | Media if Post is one */}
        {publication.metadata.media?.length > 0 && (
          <MediaRenderer
            src={publication.metadata.media[0].original.url}
            alt={publication.metadata.name || ""}
            className={styles.feedPostContentImage}
          />
        )}
      </div>
    </div>
    // {publication.metadata.name}
  )
}