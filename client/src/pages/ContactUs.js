import React from 'react';

import styles from "../styles/ContactUs.module.css";

import ContactUsForm from '../components/ContactUsForm';

const ContactUs = () => {
    return (
        <main className={styles.wrapper}>
            <ContactUsForm />
            <div className={styles.rules}>
                <h2 className={styles.title}>Instructions</h2>
                <ul className={styles.rulesList}>
                    <li className={styles.ruleItem}>No swearing or offensive language.</li>
                    <li className={styles.ruleItem}>Be respectful to customer service.</li>
                    <li className={styles.ruleItem}>Be very specific in detailing your problem.</li>
                    <li className={styles.ruleItem}>Report any inappropriate behavior to moderators.</li>
                    <li className={styles.ruleItem}>We will get back to you as soon as possible.</li>
                </ul>
            </div>
        </main>
    )
}

export default ContactUs