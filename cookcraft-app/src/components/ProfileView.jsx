import styles from '../css/ProfileCss/profile-view-style.module.css';
import { useState, useEffect } from "react";
import Sidebar from './ProfileComponents/Sidebar';
import ProfileSection from './ProfileComponents/ProfileSection';
import FavoriteRecipesSection from "./ProfileComponents/FavoriteRecipesSection";
import MyReviewsSection from "./ProfileComponents/MyReviewsSection";
import OrderHistorySection from "./ProfileComponents/OrderHistorySection";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProfileView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFromState = location.state?.selected || 0;
    const sidebarItems = ["Profile", "Favorite Recipes", "My Reviews", "Order History"];
    const [selectedSideBar, setSelectedSideBar] = useState(selectedFromState);

    useEffect(() => {
        setSelectedSideBar(selectedFromState);
    }, [selectedFromState]);

    let heading = sidebarItems[selectedSideBar];

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
        <div className={styles.parent}>
            <div className={styles.settingsContainer}>
                <div className={styles.header}>
                    <div className={styles.backArrow} onClick={handleBackToHome}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className={styles.settingsWrapper}><h2>{heading}</h2></div>
                </div>
                <div className={styles.contentWrapper}>
                    <Sidebar
                        items={sidebarItems}
                        selected={selectedSideBar}
                        onSelect={setSelectedSideBar}
                    />
                    <div className={styles.mainContent}>
                        {selectedSideBar === 0 && <ProfileSection/>}
                        {selectedSideBar === 1 && <FavoriteRecipesSection/>}
                        {selectedSideBar === 2 && <MyReviewsSection/>}
                        {selectedSideBar === 3 && <OrderHistorySection/>}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfileView;
