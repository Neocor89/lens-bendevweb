import Link from 'next/link';
import React from 'react';
import styles from "../styles/Header.module.css";
import SignInButton from './SignInButton';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
        <Link href={"/"}>
          <img 
            src="/logo-profile.png"
            alt='logo'
            className={styles.headerLogo}
          />
        </Link>

      {/* Signin Users */}
      <SignInButton />
    </div>
  )
}