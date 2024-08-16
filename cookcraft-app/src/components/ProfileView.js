import styles from '../css/ProfileCss/profile-view-style.module.css';
import { useState, useEffect } from "react";
import Sidebar from './ProfileComponents/Sidebar';
import ProfileSection from './ProfileComponents/ProfileSection';
import FavoriteRecipesSection from "./ProfileComponents/FavoriteRecipesSection";
import MyReviewsSection from "./ProfileComponents/MyReviewsSection";
import OrderHistorySection from "./ProfileComponents/OrderHistorySection";
import { useLocation } from 'react-router-dom';
import Header from "./HomeComponents/Header";

const ProfileView = () => {
    const location = useLocation();
    const selectedFromState = location.state?.selected || 0;
    const sidebarItems = ["Profile", "Favorite Recipes", "My Reviews", "Order History"];
    const [selectedSideBar, setSelectedSideBar] = useState(selectedFromState);

    useEffect(() => {
        setSelectedSideBar(selectedFromState);
    }, [selectedFromState]);

    let heading = sidebarItems[selectedSideBar];

    return (
        <>
            <Header/>
            <div className={styles.settingsContainer}>
                <div className={styles.header}>
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
        </>
    );
};

export default ProfileView;
