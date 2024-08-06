import React from 'react';
import './FoodCard.css';

interface FoodCardProps {
    title: string;
    imageUrl: string;
    price: number;
    weight: string;
    isActive: boolean;
    quantity: number;
    onClick: () => void;
    onQuantityChange: (amount: number) => void;
    onAddToCart: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, imageUrl, price, weight, isActive, quantity, onClick, onQuantityChange, onAddToCart }) => {
    return (
        <div className={`food-card ${isActive ? 'active' : ''}`} onClick={onClick}>
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{weight}</p>
            <p>${price.toFixed(2)}</p>
            {isActive && (
                <>
                    <div className="quantity-selector">
                        <button onClick={(e) => { e.stopPropagation(); onQuantityChange(-1); }}>-</button>
                        <span>{quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); onQuantityChange(1); }}>+</button>
                    </div>
                    <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>Add to Cart</button>
                </>
            )}
        </div>
    );
}

export default FoodCard;