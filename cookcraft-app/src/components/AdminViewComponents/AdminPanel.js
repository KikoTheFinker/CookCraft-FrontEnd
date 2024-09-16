import styles from "../../css/AdminPanelCss/admin-style.module.css";
import ApplicationCard from "./ApplicationCard";
import React, { useEffect, useState } from "react";
import AdminReviewCard from "./AdminReviewCard";
import ReviewModal from "./AdminReviewModal";
import ApplicationModal from "./AdminApplicationModal";
import { useNavigate } from "react-router-dom";
import AdminOrderCard from "./AdminOrderCard";
import AdminOrderReviewCard from "./AdminOrderReviewCard";
import AdminOrderModal from "./AdminOrderModal";
import AdminOrderReviewModal from "./AdminOrderReviewModal";

const AdminPanel = () => {
    const [active, setActive] = useState("applications");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [cards, setCards] = useState([]);
    const [reload, setReload] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderReview, setSelectedOrderReview] = useState(null);
    const [showPending, setShowPending] = useState(false);
    const [showAccepted, setShowAccepted] = useState(false);
    const [showFinished, setShowFinished] = useState(false);
    const [pending, setPending] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const [finished, setFinished] = useState([]);
    const navigate = useNavigate();

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

                    if (active === "orders") {
                        const newPending = [];
                        const newAccepted = [];
                        const newFinished = [];
                        data.content.forEach((content) => {
                            let deliveryPerson = content.deliveryPerson;
                            let order = content.order;

                            if (deliveryPerson === null) {
                                newPending.push(content);
                            } else if (!order.isFinished) {
                                newAccepted.push(content);
                            } else {
                                newFinished.push(content);
                            }
                        });

                        setPending(newPending);
                        setAccepted(newAccepted);
                        setFinished(newFinished);
                    } else {
                        setPending([]);
                        setAccepted([]);
                        setFinished([]);
                    }
                } else if (response.status === 403) {
                    navigate("/");
                } else {
                    alert("Bad request.");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [active, page, reload, navigate]);

    const handleApplicationClick = () => {
        setActive("applications");
        setPage(0);
    };

    const handleCommentsClick = () => {
        setActive("reviews");
        setPage(0);
    };

    const handleOrdersClick = () => {
        setActive("orders");
        setPage(0);
    };

    const handleOrderReviewsClick = () => {
        setActive("orderreviews");
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

    const openOrderModal = (orderData) => {
        setSelectedOrder(orderData);
    };

    const openOrderReviewModal = (orderReviewData) => {
        setSelectedOrderReview(orderReviewData);
    };

    const closeModals = () => {
        setSelectedReview(null);
        setSelectedApplication(null);
        setSelectedOrder(null);
        setSelectedOrderReview(null);
    };

    const handleRemoveReview = async (reviewId) => {
        let token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/admin/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setReload(true);
            } else {
                alert("Bad request.");
            }
        } catch (error) {
            console.error(error);
            alert("Error removing review.");
        }
    };

    const handleRemoveOrderReview = async (orderId) => {
        let token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/admin/orderreviews/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok)
            {
                setReload(true)
            }
            else if(response.status === 403)
            {
                navigate("/");
            }
            else
            {
                console.log(response.status);
                alert("Bad request.")
            }
        }
        catch (error) {
            console.error(error);
            alert("Error removing order review.")
        }
    }

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
                        className={active === "orders" ? styles.buttonClicked : styles.button}
                        onClick={handleOrdersClick}
                    >
                        Orders
                    </div>
                    <div
                        className={active === "orderreviews" ? styles.buttonClicked : styles.button}
                        onClick={handleOrderReviewsClick}
                    >
                        Order Reviews
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
                        cards.length !== 0 ? (
                            cards.map((cardData, index) =>
                                active === "applications" ? (
                                    <ApplicationCard
                                        key={index}
                                        data={cardData}
                                        onClick={(completeData) => openApplicationModal(completeData)}
                                    />
                                ) : (
                                    active === "orders" ? (
                                        <></>
                                    ) : (
                                        active === "orderreviews" ? (
                                            <AdminOrderReviewCard
                                                key={index}
                                                data={cardData}
                                                onClick={() => openOrderReviewModal(cardData)}
                                            />
                                        ) : (
                                            <AdminReviewCard
                                                key={index}
                                                data={cardData}
                                                onClick={() => openReviewModal(cardData)}
                                            />
                                        )
                                    )
                                )
                            )
                        ) : <p className={styles.noDataText}>No data found.</p>
                    }
                    {
                        active === "orders" ? (
                            <>
                                <div className={styles.orderContainer}>
                                    <h3 onClick={() => setShowPending(!showPending)} className={styles.toggleSection}>
                                        {showPending ? "▼" : "▶"} Pending Orders
                                    </h3>
                                    {showPending &&
                                        pending.map((order, index) => (
                                            <AdminOrderCard
                                                key={index}
                                                data={order}
                                                onClick={() => openOrderModal(order)}
                                            />
                                        ))}
                                </div>
                                <div className={styles.orderContainer}>
                                    <h3 onClick={() => setShowAccepted(!showAccepted)} className={styles.toggleSection}>
                                        {showAccepted ? "▼" : "▶"} Accepted Orders
                                    </h3>
                                    {showAccepted &&
                                        accepted.map((order, index) => (
                                            <AdminOrderCard
                                                key={index}
                                                data={order}
                                                onClick={() => openOrderModal(order)}
                                            />
                                        ))}
                                </div>
                                <div className={styles.orderContainer}>
                                    <h3 onClick={() => setShowFinished(!showFinished)} className={styles.toggleSection}>
                                        {showFinished ? "▼" : "▶"} Finished Orders
                                    </h3>
                                    {showFinished &&
                                        finished.map((order, index) => (
                                            <AdminOrderCard
                                                key={index}
                                                data={order}
                                                onClick={() => openOrderModal(order)}
                                            />
                                        ))}
                                </div>
                            </>
                        ) : null
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
                <AdminOrderModal
                    isOpen={selectedOrder !== null}
                    orderData={selectedOrder}
                    onClose={closeModals}
                />
                <AdminOrderReviewModal
                    isOpen={selectedOrderReview !== null}
                    orderReviewData={selectedOrderReview}
                    onClose={closeModals}
                    onRemove={handleRemoveOrderReview}
                />
            </div>
        </>
    );
};

export default AdminPanel;
