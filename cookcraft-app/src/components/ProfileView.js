//import '../css/profile-view-style.css';
import { useState } from "react";
import Sidebar from './Sidebar';
import ProfileSection from './ProfileSection';
import FavoriteRecipesSection from "./FavoriteRecipesSection";

const ProfileView = ({ heading }) => {
    const sidebarItems = ["Profile", "Favorite Recipes", "My Reviews", "Order History"];
    const [selectedSideBar, setSelectedSideBar] = useState(0);

    heading = sidebarItems[selectedSideBar];

    return (
        <div className="settings-container">
            <div className="header">
                <div className="settings-wrapper"><h2>{heading}</h2></div>
            </div>
            <div className="content-wrapper">
                <Sidebar
                    items={sidebarItems}
                    selected={selectedSideBar}
                    onSelect={setSelectedSideBar}
                />
                <div className="main-content">
                    {selectedSideBar === 0 && <ProfileSection />}
                    {selectedSideBar === 1 && <FavoriteRecipesSection />}
                    {/*{selectedSideBar === 2 && <MyReviewsSection />}*/}
                    {/*{selectedSideBar === 3 && <OrderHistorySection />}*/}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;