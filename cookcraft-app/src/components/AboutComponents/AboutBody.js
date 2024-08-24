import styles from "../../css/AboutPageCss/about-body-style.module.css"
import mission_image from "../../images/AboutPhoto1.jpg"
import vision_image from "../../images/AboutPhoto2.jpg"
import value_image from "../../images/AboutPhoto3.jpg"
const AboutBody = () => {

    return <div className={styles.aboutSection}>
        <div className={styles.container}>
            <h1>About CookCraft</h1>
            <p className={styles.introText}>
                At CookCraft, we believe that cooking is more than just a necessity, it's an art form that brings people
                together. Whether you're an experienced chef or just starting in the kitchen, CookCraft is here to
                inspire, guide, and support your culinary journey.
            </p>

            <div className={styles.aboutDetails}>
                <div className={styles.aboutItem}>
                    <img src={mission_image}  alt="Our Mission"/>
                    <h3>Our Mission</h3>
                    <p>
                        To make cooking accessible to everyone by providing easy-to-follow recipes, detailed guides, and
                        a supportive community.
                    </p>
                </div>
                <div className={styles.aboutItem}>
                    <img src={vision_image} alt="Our Vision"/>
                    <h3>Our Vision</h3>
                    <p>
                        To become the go-to platform for all things cooking, where everyone can find inspiration,
                        knowledge, and a sense of belonging.
                    </p>
                </div>
                <div className={styles.aboutItem}>
                    <img src={value_image} alt="Our Values"/>
                    <h3>Our Values</h3>
                    <p>
                        We value creativity, community, and the joy of cooking. We are committed to helping everyone
                        discover the chef within.
                    </p>
                </div>
            </div>

            <div className={styles.teamSection}>
                <h2>Meet the Team</h2>
                <p className={styles.teamIntro}>
                    Our team of passionate cooks, developers, and content creators work tirelessly to bring you the best
                    cooking experience possible.
                </p>
                <div className={styles.teamMembers}>
                    <div className={styles.teamMember}>
                        <img src="https://via.placeholder.com/250" alt="Team Member 1"/>
                        <h4>Team Member 1</h4>
                        <p>Role: Lead Developer</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="https://via.placeholder.com/250" alt="Team Member 2"/>
                        <h4>Team Member 2</h4>
                        <p>Role: Head Chef</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="https://via.placeholder.com/250" alt="Team Member 3"/>
                        <h4>Team Member 3</h4>
                        <p>Role: Content Creator</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AboutBody;