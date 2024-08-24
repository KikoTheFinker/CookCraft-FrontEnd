import React, { useState, useEffect } from 'react';
import styles from '../../css/ProfileCss/profileSection.module.css';

const ProfileSection = () => {
    const [profileData, setProfileData] = useState({
        userName: '',
        userSurname: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPhoneNumber = localStorage.getItem("phoneNumber");
        const storedUserName = localStorage.getItem("userName");
        const storedUserSurname = localStorage.getItem("userSurname");

        setProfileData({
            userName: storedUserName || '',
            userSurname: storedUserSurname || '',
            email: storedEmail || '',
            phoneNumber: storedPhoneNumber || ''
        });
    }, []);

    return (
        <div className={styles.profileSection}>
            <form className={styles.profileForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="profile-name">Profile name</label>
                    <input 
                        type="text" 
                        id="profile-name" 
                        value={profileData.userName} 
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="profile-surname">Profile surname</label>
                    <input 
                        type="text" 
                        id="profile-surname" 
                        value={profileData.userSurname}
                        readOnly 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={profileData.email}  
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phoneNumber" 
                        value={profileData.phoneNumber} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        defaultValue="" 
                    />
                    <div className={styles.addressDetails}>
                        <div className={styles.addressNumber}>
                            <label htmlFor="address-number">Number</label>
                            <input 
                                type="text" 
                                id="address-number" 
                                defaultValue="" 
                            />
                        </div>
                        <div className={styles.addressFloor}>
                            <label htmlFor="address-floor">Floor</label>
                            <input 
                                type="text" 
                                id="address-floor" 
                                defaultValue="" 
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.saveBtn}>Save changes</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSection;
