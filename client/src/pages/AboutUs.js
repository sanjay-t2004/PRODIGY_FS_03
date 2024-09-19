import React from 'react';

import styles from "../styles/AboutUs.module.css";

import yahya from "../assets/yahya.jpg";

const AboutUs = () => {
    return (
        <main className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img src={yahya} alt='yahya' width={240} height={360} className={styles.picture} />
            </div>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>🌐 Full Stack Developer | Web & Mobile Specialist 🌐</h1>

                <p className={styles.biography}>
                    Hi, I'm Yahya, a passionate and innovative full stack web and mobile developer dedicated to creating modern, cutting-edge solutions. With a strong foundation in the MERN stack, NextJS, ThreeJS, and PhaserJS, alongside expertise in React Native for mobile development, I bring a versatile skill set to every project. <br /><br />

                    My journey in tech is fueled by a relentless curiosity and a commitment to continuous learning. I'm always exploring new technologies and techniques to push the boundaries of what's possible. Whether it's crafting mesmerizing 3D websites or building robust web and mobile applications, my goal is to deliver exceptional user experiences and advance the technological landscape.
                </p>
            </div>
        </main>
    )
}

export default AboutUs