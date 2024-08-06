import React from 'react';
import { CartItem } from './types';
import './CartModal.css';

interface CartModalProps {
    cart: CartItem[];
    totalPrice: number;
    onClose: () => void;
    onUpdateQuantity: (index: number, quantity: number) => void;
    onRemoveItem: (index: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, totalPrice, onClose, onUpdateQuantity, onRemoveItem }) => {
    return (
        <div className="cart-modal">
            <div className="cart-modal-content">
                <h2>Your Cart</h2>
                <button className="close-button" onClick={onClose}>Close</button>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-weight">{item.weight}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => onUpdateQuantity(index, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="cart-item-right">
                                <button className="remove-button" onClick={() => onRemoveItem(index)}>✕</button>
                                <p>{(item.price * item.quantity).toFixed(2)}$</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default CartModal;