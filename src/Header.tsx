import React from 'react';
import './Header.css';


interface HeaderProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory }) => {
    const categories = ['Burger', 'Pasta', 'Pizza', 'Main Course', 'Sandwich', 'Taco', 'Pastry'];

    return (
        <div className="header">
            {categories.map((item, index) => (
                <button
                    key={index}
                    className={`header-button ${activeCategory === item ? 'active' : ''}`}
                    onClick={() => setActiveCategory(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default Header;