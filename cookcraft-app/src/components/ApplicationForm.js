import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ApplicationFormCss/ApplicationForm.module.css';
import modalStyles from '../css/ApplicationFormCss/AlertModal.module.css';

function ApplicationForm() {
    const [cv, setCv] = useState(null);
    const [motivationalLetter, setMotivationalLetter] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if the token exists
    }, []);

    const handleCvChange = (e) => {
        setCv(e.target.files[0]);
    };

    const handleMotivationalLetterChange = (e) => {
        setMotivationalLetter(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const applicationData = {
            cv: cv ? await cvToBase64(cv) : null,
            motivational_letter: motivationalLetter,
            phone_number: phoneNumber,
            email: email,
        };
    
        try {
            const token = localStorage.getItem('token');  
    
            const response = await fetch('http://localhost:8080/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(applicationData), 
            });
    
            if (response.ok) {
                setShowModal(true); // Show the success modal
                setTimeout(() => {
                    setShowModal(false);
                    setCv(null);
                    setMotivationalLetter('');
                    setPhoneNumber('');
                    setEmail('');
                    navigate('/'); // Redirect after a delay
                }, 3000); // Adjust the delay as needed
            } else {
                alert('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred while submitting the application.');
        }
    };
    
    const cvToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.formContainer}>
                <div className={styles.messageContainer}>
                    <h2 className={styles.formTitle}>Please log in to apply for the delivery position.</h2>
                    <button onClick={() => navigate('/login')} className={styles.loginButton}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }
    

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.applicationForm}>
                <h2 className={styles.formTitle}>Apply for Delivery Position</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="cv">Upload CV:</label>
                    <input
                        type="file"
                        id="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCvChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="motivationalLetter">Motivational Letter:</label>
                    <textarea
                        id="motivationalLetter"
                        value={motivationalLetter}
                        onChange={handleMotivationalLetterChange}
                        rows="6"
                        placeholder="Write your motivational letter"
                        required
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Submit Application
                    </button>
                </div>
            </form>

            {showModal && (
                <>
                    <div className={`${modalStyles.modalOverlay} ${modalStyles.show}`}></div>
                    <div className={`${modalStyles.alertModal} ${modalStyles.show}`}>
                        <h3>Application Submitted!</h3>
                        <p>Your application has been submitted successfully. You will be redirected to the homepage shortly.</p>
                        <button className={modalStyles.closeButton} onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ApplicationForm;
