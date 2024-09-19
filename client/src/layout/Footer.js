import React from 'react';

import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.left}>
                <h2 className={styles.projectCode}>PRODIGY_FS_03</h2>
                <h4 className={styles.projectTitle}>E-Commerce Application</h4>
            </div>

            <div className={styles.middle}>
                <h2 className={styles.devName}>Yahya Nashar</h2>
                <h4 className={styles.position}>Full Stack Web Developer</h4>
            </div>

            <div className={styles.right}>
                <h2 className={styles.techStack}>Tech Stack</h2>
                <ul className={styles.techList}>
                    <li className={styles.techItem}>MERN</li>
                    <li className={styles.techItem}>Material ui</li>
                    <li className={styles.techItem}>Framer Motion</li>
                    <li className={styles.techItem}>Redux Toolkit</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer