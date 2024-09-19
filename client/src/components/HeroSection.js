import React from 'react';
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.logo}></div>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Prodigy - FS - 03</h1>
                <h2 className={styles.slogan}>E-Commerce Application</h2>
            </div>
        </section>
    )
}

export default HeroSection