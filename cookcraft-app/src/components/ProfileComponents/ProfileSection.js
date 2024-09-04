import React, {useState, useEffect} from 'react';
import styles from '../../css/ProfileCss/profileSection.module.css';

const ProfileSection = () => {
    const [profileData, setProfileData] = useState({
        userName: '',
        userSurname: '',
        email: '',
        phoneNumber: '',
        address: '',
        addressNumber: '',
        addressFloor: ''
    });

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        const storedUserSurname = localStorage.getItem("userSurname");
        const storedEmail = localStorage.getItem("email");
        const storedPhoneNumber = localStorage.getItem("phoneNumber");
        const storedAddress = localStorage.getItem("address");

        let parts = storedAddress.split(" ");

        setProfileData({
            userName: storedUserName || '',
            userSurname: storedUserSurname || '',
            email: storedEmail || '',
            phoneNumber: storedPhoneNumber || '',
            address: parts[0] || '',
            addressNumber: parts[1] || '',
            addressFloor: parts[2] || ''
        });
    }, []);

    const handleSaveChanges = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token");

            const updatedProfileData = {
                ...profileData,
                address: `${profileData.address} ${profileData.addressNumber} ${profileData.addressFloor}`
            };

            const response = await fetch("http://localhost:8080/api/profile/update", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedProfileData)
            })

            if (response.ok) {
                //duplicate code as Login.js
                const data = await response.json();
                const {token, userName, userSurname, email, phoneNumber = '', address = ''} = data;

                updatedProfileData.phoneNumber === '' ? localStorage.setItem("phoneNumber", "") : localStorage.setItem("phoneNumber", updatedProfileData.phoneNumber)
                updatedProfileData.address === '' ? localStorage.setItem("address", "") : localStorage.setItem("address", updatedProfileData.address);

                alert("Profile updated successfully.")
            }

        } catch (error) {
            alert("An error occurred while saving your changes.")
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProfileData({
            ...profileData,
            [name]: value
        })
    }

    return (
        <div className={styles.profileSection}>
            <form className={styles.profileForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="profile-name">Profile name</label>
                    <input
                        type="text"
                        id="profile-name"
                        name="userName"
                        value={profileData.userName}
                        onChange={(e) => handleInputChange(e)}
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="profile-surname">Profile surname</label>
                    <input
                        type="text"
                        id="profile-surname"
                        name="userSurname"
                        value={profileData.userSurname}
                        onChange={(e) => handleInputChange(e)}
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange(e)}
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <div className={styles.addressDetails}>
                        <div className={styles.addressNumber}>
                            <label htmlFor="address-number">Number</label>
                            <input
                                type="text"
                                id="address-number"
                                name="addressNumber"
                                value={profileData.addressNumber}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className={styles.addressFloor}>
                            <label htmlFor="address-floor">Floor</label>
                            <input
                                type="text"
                                id="address-floor"
                                name="addressFloor"
                                value={profileData.addressFloor}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.saveBtn} onClick={handleSaveChanges}>Save changes</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSection;
