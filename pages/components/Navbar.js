import React from "react";
import styles from "../Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const inlineStyles = {
    width: "2px"
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/hearts.jpg" style={inlineStyles} />
      </div>
      <ul className={styles["nav-links"]}>
       <Link href='/' > Home</Link>
         <Link href='/about' > About</Link>
         <Link href='/tips' > Tips</Link>
         <Link href='/forum' > Forum</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
