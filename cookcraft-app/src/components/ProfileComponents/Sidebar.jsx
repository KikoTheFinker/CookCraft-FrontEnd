import styles from '../../css/ProfileCss/sidebar.module.css';

const Sidebar = ({ items, selected, onSelect }) => {
    return (
        <div className={styles.sidebar}>
            <ul>
                {items.map((item, index) => (
                    <li
                        key={item}
                        className={selected === index ? styles.active : ""}
                        onClick={() => onSelect(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
