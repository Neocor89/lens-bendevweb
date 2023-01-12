import { useRouter } from 'next/router';
import React from 'react';
import { useProfileQuery } from '../../graphql/generated';
import styles from "../../styles/Profile.module.css";

type Props = {}

export default function ProfilePage({}: Props) {

  const router = useRouter();

  // Catch /[id] path from URL
  const { id } = router.query;

  const { isLoading: loadingProfile, data: profileData } = useProfileQuery(
    {
      request: {
        handle: id
      },
    },
    {
      enabled: !!id,
    }
  );

  console.log(loadingProfile, profileData);
  

  return (
    <div className={styles.profileContainer}>

      <div className={styles.profileContentContainer}>

        {/* Cover Image */}

        {/* Profile Picture */}

        {/* Profile Handle */}

        {/* Profile Description */}
      </div>

      <div className={styles.publicationsContainer}>
        {/* Publications FeedItem */}

      </div>
    </div>
  )
}