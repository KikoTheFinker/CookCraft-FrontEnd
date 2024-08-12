const Sidebar = ( {items, selected, onSelect} ) => {
    return <div className="sidebar">
        <ul>
            {items.map((item, index) =>
                <li
                    key={item}
                    className={selected === index ? "active" : ""}
                    onClick={() => onSelect(index)}
                >
                    {item}
                </li>
            )}
        </ul>
    </div>
}

export default Sidebar