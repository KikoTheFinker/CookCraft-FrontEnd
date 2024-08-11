import '../css/profile-view-style.css';
import profile_picture from '../images/default-user-picture.png';
import {useState} from "react";

const ProfileView = ( {heading} ) => {

    let sidebarItems = ["Profile", "Favorite Recipes", "My Reviews", "Order History"]
    const [selectedSideBar, setSelectedSideBar] = useState(0)

    return (
        <div className="settings-container">
            <div className="header">
                <div className="settings-wrapper"><h2>{heading}</h2></div>
            </div>
            <div className="content-wrapper">
                <div className="sidebar">
                    <ul>
                        {sidebarItems.map((item, index) =>
                            <li
                                key={item}
                                className={selectedSideBar === index ? "active" : ""}
                                onClick={ () => {
                                    setSelectedSideBar(index)
                                }}
                            >
                                {item}
                            </li>
                        )}
                    </ul>
                </div>
                {selectedSideBar === 0 && <div className="main-content">
                    <div className="profile-section">
                        <div className="profile-picture">
                            <img src={profile_picture} alt="Profile Picture"/>
                            <button className="change-btn">Change picture</button>
                            <button className="delete-btn">Delete picture</button>
                        </div>
                        <form className="profile-form">
                            <div className="form-group">
                                <label htmlFor="profile-name">Profile name</label>
                                <input type="text" id="profile-name" defaultValue="Gorazd B"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" defaultValue="gorazd@gmail.com" disabled/>
                                <p className="note">Available change in 25/04/2024</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Phone Number">Phone Number</label>
                                <input type="tel" id="Phone Number" defaultValue="075-321-123"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-1">Address 1</label>
                                <input type="text" id="address-1" defaultValue=""/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-2">Address 2</label>
                                <input type="text" id="address-2" defaultValue=""/>
                            </div>
                            <button className="save-btn">Save changes</button>
                        </form>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ProfileView;
