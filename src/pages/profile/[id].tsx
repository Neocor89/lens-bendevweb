import { MediaRenderer, Web3Button } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import FeedPost from '../../components/FeedPost';
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from '../../const/contracts';
import { useProfileQuery, usePublicationsQuery } from '../../graphql/generated';
import { useFollow } from '../../lib/useFollow';
import styles from "../../styles/Profile.module.css";

type Props = {}

export default function ProfilePage({}: Props) {

  const router = useRouter();

  // Catch /[id] path from URL
  const { id } = router.query;
  
  const { mutateAsync: followUser } = useFollow();


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

  if ( publicationsError || profileError ) {
    return <div>Could not find this profile!</div>
  }

  if (loadingProfile) {
    return <div className={styles.loadingPublicationsContainer}>
    <h2 className={styles.loadingPublications}>Loading Publications...</h2>
  </div>
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContentContainer}>

        {/* Cover Image */}
        {/* @ts-ignore */}
        {profileData?.profile?.coverPicture?.original?.url && (
        <MediaRenderer 
        // @ts-ignore
          src={profileData?.profile?.coverPicture?.original?.url || "https://res.cloudinary.com/dwoifuutn/image/upload/v1666536960/bored-landing-page_jgaklg.png"}
          alt={profileData?.profile?.name || profileData?.profile?.handle || ""}
          className={styles.coverImageContainer}
        />
        )}

        {/* Profile Picture */}
        {/* @ts-ignore */}
        {profileData?.profile?.picture?.original?.url && (
            <MediaRenderer
            // @ts-ignore
              src={profileData.profile.picture.original.url || "https://res.cloudinary.com/dwoifuutn/image/upload/v1666343939/chat-dapp-logo_e9wmil.png"} 
              alt={profileData.profile.name || profileData.profile.handle || ""}
              className={styles.profilePictureContainer}
            />
        )} 

        {/* Profile Name */}
        <h1 className={styles.profileName}>
          {profileData?.profile?.name || "User not exist"}
        </h1>

        {/* Profile Handle */}
        <p className={styles.profileHandle}>
          {profileData?.profile?.handle || "User not exist"}
        </p>

        {/* Profile Description */}
        <p className={styles.profileDescription}>
          {profileData?.profile?.bio}
        </p>

        <p className={styles.followerCount}>
          {profileData?.profile?.stats.totalFollowers} <strong>{"  Followers"}</strong>
        </p>

        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button>

        <div className={styles.publicationsContainer}>
          {isLoadingPublications ? ( 
            <div className={styles.loadingPublicationsContainer}>
              <h2 className={styles.loadingPublications}>Loading Publications...</h2>
            </div> 
          ) : (
            // Mapping in data of Array publication
            publicationsData?.publications.items.map((publication) => (
              <FeedPost publication={publication} key={publication.id} />
            ))
          )}
      </div>

      </div>
    </div>
  )
}