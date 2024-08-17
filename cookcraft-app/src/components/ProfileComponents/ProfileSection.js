import styles from '../../css/ProfileCss/profileSection.module.css';
import React from 'react';


const ProfileSection = () => (
    <div className={styles.profileSection}>
        <form className={styles.profileForm}>
            <div className={styles.formGroup}>
                <label htmlFor="profile-name">Profile name</label>
                <input type="text" id="profile-name" defaultValue="Gorazd B"/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" defaultValue="gorazd@gmail.com" disabled/>
                <p className={styles.note}>Available change in 25/04/2024</p>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="tel" id="Phone Number" defaultValue="075-321-123"/>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" defaultValue=""/>
                <div className={styles.addressDetails}>
                    <div className={styles.addressNumber}>
                        <label htmlFor="address-number">Number</label>
                        <input type="text" id="address-number" defaultValue=""/>
                    </div>
                    <div className={styles.addressFloor}>
                        <label htmlFor="address-floor">Floor</label>
                        <input type="text" id="address-floor" defaultValue=""/>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.saveBtn}>Save changes</button>
            </div>
        </form>
    </div>
);

export default ProfileSection;
