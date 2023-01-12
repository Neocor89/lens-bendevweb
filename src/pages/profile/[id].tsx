import { useRouter } from 'next/router';
import React from 'react';
import { useProfileQuery, usePublicationsQuery } from '../../graphql/generated';
import styles from "../../styles/Profile.module.css";

type Props = {}

export default function ProfilePage({}: Props) {

  const router = useRouter();

  // Catch /[id] path from URL
  const { id } = router.query;

  const { 
    isLoading: loadingProfile, 
    data: profileData, 
    error: profileError 
  } = useProfileQuery({
      request: {
        handle: id
      },
    },
    {
      enabled: !!id,
    }
  );

  const { 
    isLoading: isLoadingPublications, 
    data: publicationsData, 
    error: publicationsError 
  } = usePublicationsQuery({
      request: {
        profileId: profileData?.profile?.id
      },
    }, 
    {
      enabled: !!profileData?.profile?.id,
    }
  );
  
  console.log({ 
    profileData, 
    loadingProfile, 
    isLoadingPublications, 
    publicationsData 
  });

  if ( publicationsError || profileError ) {
    return <div>Could not find this profile!</div>
  }

  if (loadingProfile) {
    return <div>Loading Profile...</div>
  }
  

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