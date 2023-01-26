import Link from 'next/link';
import React from 'react';
import styles from "../styles/Header.module.css";
import SignInButton from './SignInButton';

export default function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.left}>
          <Link href={"/"}>
            <img 
              src="/logo-profile.png"
              alt='logo'
              className={styles.headerLogo}
            />
          </Link>

          <button className={styles.createPost}>
            <Link href={"/create"}>Create Post</Link>
          </button>
        </div>
        {/* Signin Users */}
        <div className={styles.right}>
        <SignInButton />
        </div>
      </div>

      <div style={{ marginTop: "55px" }} />
    </>
  )
}