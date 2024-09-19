import React from 'react';
import { Link } from 'react-router-dom';

import styles from "../styles/ProjectDetails.module.css";

const ProjectDetails = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.introductionText}>
                <h1 className={styles.welcome}>Welcome To The The Third Task!</h1>
                <p className={styles.description}>
                    This is the third project assigned to me as a full stack web developer for the internship at <span className='prodigyInfoTech'>Prodigy Info Tech</span>.<br />
                    The task was to create a simple e-commerce application that allows users to navigate between products, add items to a shopping cart, and of course can check the image, description and prices for all the different products.<br />
                    As bonuses the integration of <span className={styles.italic}>role-based-actions</span> such as a dashboard for authorized users to perform basic <span className={styles.italic}>CRUD Operations</span> on the products and order management. As well as for normal users to be able to sort and filter and search based on specific criteria.<br />
                    Users can also post reviews on products and have access to customer support link so that they can report directly if needed.s
                </p>
            </div>
            <Link to="/store" className={styles.CTA}>Check out our store!</Link>
        </section>
    )
}

export default ProjectDetails