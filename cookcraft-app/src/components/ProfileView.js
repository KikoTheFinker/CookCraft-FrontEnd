import styles from '../css/ProfileCss/profile-view-style.module.css';
import { useState } from "react";
import Sidebar from './ProfileComponents/Sidebar';
import ProfileSection from './ProfileComponents/ProfileSection';
import FavoriteRecipesSection from "./ProfileComponents/FavoriteRecipesSection";
import MyReviewsSection from "./ProfileComponents/MyReviewsSection";
import OrderHistorySection from "./ProfileComponents/OrderHistorySection";

const ProfileView = ({ heading }) => {
    const sidebarItems = ["Profile", "Favorite Recipes", "My Reviews", "Order History"];
    const [selectedSideBar, setSelectedSideBar] = useState(0);

    heading = sidebarItems[selectedSideBar];

    return (
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
                    {selectedSideBar === 0 && <ProfileSection />}
                    {selectedSideBar === 1 && <FavoriteRecipesSection />}
                    {selectedSideBar === 2 && <MyReviewsSection />}
                    {selectedSideBar === 3 && <OrderHistorySection />}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;