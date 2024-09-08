import styles from "../../css/AdminPanelCss/admin-style.module.css";
import {useEffect, useState} from "react";

const ApplicationCard = ( { data } ) => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const url = 'http://localhost:8080/api';
        const { cv, motivationalLetter, userId} = data;
        //TODO Show modal with cv and motivational letter
        // console.log(cv)
        // console.log(motivationalLetter)
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${url}/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })

                if(response.ok)
                {
                    const user_data = await response.json();
                    setUserData(user_data)
                }
                else
                {
                    alert("Custom response.");
                }
            }
            catch (error) {
                console.error(error);
                alert("Error communicating with the server.");
            }
        }

        fetchUserData()
    }, [data]);

    return <>
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{userData.userName} {userData.userSurname}</h3>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
            </div>
        </div>
    </>
}

export default ApplicationCard;