import styles from "../../css/AdminPanelCss/admin-style.module.css"
import ApplicationCard from "./ApplicationCard";
import React, {useEffect, useState} from "react";
import AdminReviewCard from "./AdminReviewCard";
import ReviewModal from "./AdminReviewModal";
import ApplicationModal from "./AdminApplicationModal";
import {useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const [active, setActive] = useState("applications");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [cards, setCards] = useState([]);
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()

    // Modal States
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const url = "http://localhost:8080/api";
        const token = localStorage.getItem("token");
        setReload(false);

        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/admin/${active}?page=${page}&size=4`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCards(data.content || []);
                    setTotalPages(data.totalPages || 0);
                }
                else if (response.status === 403) {
                    console.log(await response.json())
                    navigate("/");
                }
                else {
                    alert("Bad request.");
                }
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, [active, page, reload]);

    const handleApplicationClick = () => {
        setActive("applications");
        setPage(0);
    };

    const handleCommentsClick = () => {
        setActive("reviews");
        setPage(0);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const openReviewModal = (reviewData) => {
        setSelectedReview(reviewData);
    };

    const openApplicationModal = (applicationData) => {
        setSelectedApplication(applicationData);
    };

    const closeModals = () => {
        setSelectedReview(null);
        setSelectedApplication(null);
    };

    const handleRemoveReview = async (reviewId) => {
        console.log("Remove review with id: ", reviewId);
        let token = localStorage.getItem("token")
        console.log(token);
        try {
            const response = await fetch(`http://localhost:8080/api/admin/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.ok)
            {
                setReload(true)
            }
            else
            {
                alert("Bad request.");
            }
        }
        catch (error) {
            console.error(error)
            alert("Error removing review.")
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topButtons}>
                    <div
                        className={active === "applications" ? styles.buttonClicked : styles.button}
                        onClick={handleApplicationClick}
                    >
                        Applications
                    </div>
                    <div
                        className={active === "reviews" ? styles.buttonClicked : styles.button}
                        onClick={handleCommentsClick}
                    >
                        User Comments
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    {
                        cards.length !== 0 ?
                            cards.map((cardData, index) =>
                                active === "applications" ? (
                                    <ApplicationCard
                                        key={index}
                                        data={cardData}
                                        onClick={(completeData) => openApplicationModal(completeData)}
                                    />
                                ) : (
                                    <AdminReviewCard
                                        key={index}
                                        data={cardData}
                                        onClick={() => openReviewModal()}
                                    />
                                )
                            ) : <p className={styles.noDataText}>No data found.</p>
                    }
                </div>
                <div className={styles.pagination}>
                    {page > 0 && (
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className={styles.pageButton}
                        >
                            &larr;
                        </button>
                    )}
                    <span className={styles.currentPage}>
                        Page {page + 1} of {totalPages}
                    </span>
                    {page < totalPages - 1 && (
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className={styles.pageButton}
                        >
                            &rarr;
                        </button>
                    )}
                </div>

                <ReviewModal
                    isOpen={selectedReview !== null}
                    reviewData={selectedReview}
                    onClose={closeModals}
                    onRemove={handleRemoveReview}
                />
                <ApplicationModal
                    isOpen={selectedApplication !== null}
                    applicationData={selectedApplication}
                    onClose={closeModals}
                    setReload={setReload}
                />
            </div>
        </>
    );
};

export default AdminPanel;