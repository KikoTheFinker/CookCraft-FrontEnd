import styles from '../../css/ProfileCss/profileSection.module.css';
import React from 'react';
import profile_picture from '../../images/default-user-picture.png';

const ProfileSection = () => (
    <div className={styles.profileSection}>
        <div className={styles.profilePicture}>
            <img src={profile_picture} alt="Profile Picture" />
            <button className={styles.changeBtn}>Change picture</button>
            <button className={styles.deleteBtn}>Delete picture</button>
        </div>
        <form className={styles.profileForm}>
            <div className={styles.formGroup}>
                <label htmlFor="profile-name">Profile name</label>
                <input type="text" id="profile-name" defaultValue="Gorazd B" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" defaultValue="gorazd@gmail.com" disabled />
                <p className={styles.note}>Available change in 25/04/2024</p>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="tel" id="Phone Number" defaultValue="075-321-123" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="address-1">Address 1</label>
                <input type="text" id="address-1" defaultValue="" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="address-2">Address 2</label>
                <input type="text" id="address-2" defaultValue="" />
            </div>
            <button className={styles.saveBtn}>Save changes</button>
        </form>
    </div>
);

export default ProfileSection;
