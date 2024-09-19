import React, { useState, useEffect } from 'react';

import styles from "../styles/Header.module.css";
import Navbar from '../components/Navbar';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';



const Header = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleBurgerClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Function to check screen size
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 850);  // Set your breakpoint here (e.g., 768px)
        };

        // Initial check
        checkScreenSize();

        // Add event listener on window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        // Disable scrolling when the menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup: ensure scroll is re-enabled when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);


    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}>
                <div></div>
                <div className={styles.titlesContainer}>
                    <h1 className={styles.title}>PRODIGY_FS_03 </h1>
                    <h3 className={styles.subTitle}>E-Commerce Application</h3>
                </div>
            </div>

            {
                isSmallScreen ?
                    isOpen ? (
                        <div className={styles.responsiveNavBars}>
                            <CloseIcon onClick={handleBurgerClick} fontSize='large' />
                            <Navbar setIsOpen={setIsOpen} />
                        </div>
                    ) : <MenuIcon fontSize='large' onClick={handleBurgerClick} />
                    :
                    <Navbar setIsOpen={setIsOpen} />
            }
        </header>
    )
}

export default Header