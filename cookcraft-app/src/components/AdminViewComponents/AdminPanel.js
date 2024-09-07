import styles from "../../css/AdminPanelCss/admin-style.module.css"
import ApplicationCard from "./ApplicationCard";
import React, {useEffect, useState} from "react";

const AdminPanel = () => {
    const [active, setActive] = useState("application");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8080/api"
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/applications`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}}`,
                        'Content-Type': 'application/json'
                    }
                })

                if(response.ok)
                {
                    const data = await response.json();
                    setCards(data.content);
                    setTotalPages(data.totalPages);
                    console.log(data)
                    console.log(cards);
                    //TODO
                }
                else
                {
                    alert("Bad request.")
                }
            }
            catch (error)
            {
                alert("Error connecting to the server.")
            }
        }

        fetchData()
    }, [active, page, cards]);

    const handleApplicationClick = () => {
        setActive("applications")
        setPage(0);
    }

    const handleCommentsClick = () => {
        setActive("reviews")
        setPage(0);
    }

    function handlePageChange(newPage) {
        setPage(newPage)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.topButtons}>
                    <div className={active === "application" ? styles.buttonClicked : styles.button}
                         onClick={handleApplicationClick}>Applications
                    </div>
                    <div className={active === "comments" ? styles.buttonClicked : styles.button}
                         onClick={handleCommentsClick}>User Comments
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    {/*Map application cards*/}
                    <ApplicationCard/>
                    <ApplicationCard/>
                    <ApplicationCard/>
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
            </div>
        </>
    );
}

export default AdminPanel;
