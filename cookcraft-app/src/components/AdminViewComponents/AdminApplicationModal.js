import styles from "../../css/AdminPanelCss/modal-style.module.css";

const ApplicationModal = ({ isOpen, onClose, applicationData, setReload }) => {
    if (!isOpen || !applicationData) return null;

    const { userData, motivationalLetter, cv } = applicationData;

    const downloadCV = () => {
        const base64String = applicationData.cv.startsWith('data:application/pdf;base64,')
            ? cv
            : 'data:application/pdf;base64,' + applicationData.cv;

        const base64Data = base64String.split(',')[1];

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `CV_${userData.userName}_${userData.userSurname}.pdf`;
        link.click();
    };

    const handleAccept = async () => {
        const token = localStorage.getItem("token");
        const { userId } = applicationData
        try {
            const response = await fetch(`http://localhost:8080/api/admin/accept/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.ok)
            {
                //alert("Updated user role successfully!");
                await handleDecline()
            }
            else
            {
                alert(response.status)
            }
        }
        catch (error) {
            alert(error);
        }
    }

    const handleDecline = async () => {
        const token = localStorage.getItem("token");
        const { id } = applicationData

        try {
            const response = await fetch(`http://localhost:8080/api/admin/decline/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.ok)
            {
                //alert("Deleted user application successfully!");
                setReload(true)
                onClose();
            }
            else
            {
                alert(response.status)
            }
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Application Details</h2>
                <p><strong>Name:</strong> {userData.userName} {userData.userSurname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
                <p><strong>Motivational Letter:</strong> {motivationalLetter}</p>
                <button onClick={downloadCV} className={styles.downloadButton}>
                    Download CV
                </button>
                <div className={styles.buttons}>
                    <button className={styles.buttonAccept} onClick={handleAccept}>Accept</button>
                    <button className={styles.buttonDecline} onClick={handleDecline}>Decline</button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;
