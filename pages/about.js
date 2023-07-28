import Navbar from "./components/Navbar";
import React from "react";
import styles from "./about.module.css";

export default function About() {



  return <>
  <Navbar/>
  <main>
  <div className={`${styles.about} ${styles.background}`}>
    <div className={`${styles.contentWrapper}`}>
  <div style={{ marginTop: "90px" }}>
          <h3> Here is a little something about the author </h3>

           <hr/>
        </div>


        <div className={`${styles.about} ${styles.row}`}>
              <div className={`${styles.about} ${styles.column}`}>
                <img className={styles.portrait} src="author.jpg" alt="authorPicture" />
              </div>
              <div className={`${styles.about} ${styles.column}`}>
                <p>
                  "We are like two light-shy little rats, always hiding and seeking."
                </p>
                  <p> 后来 你朝我笑 不止眼睛</p>
              </div>
            </div>
            </div>
</div>

<h2> Where the idea originated </h2>

<h2> tech stack </h2>


<p> In the end, I want to give special thanks to John Sigma for his MERN stack course on Udemy and Youtube </p>

</main>
  </>
}
