import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import FoodCard from './FoodCard';
import CartModal from './CartModal';
import { CartItem } from './types';






const App: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('Burger');
  const [quantities, setQuantities] = useState<number[]>(new Array(8).fill(0)); // Assuming max 8 items per category
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);


    const burgers = [
        { title: "Royale De Luxe", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/royal-deluxe.jpg`, price: 2.50, weight: "140 g" },
        { title: "Cheeseburger", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/cheeseburger.jpg`, price: 3.00, weight: "150 g" },
        { title: "Bacon Burger", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/bacon-burger.jpg`, price: 4.00, weight: "170 g" },
        { title: "Veggie Delight", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/veggie-delight.jpg`, price: 2.80, weight: "130 g" },
        { title: "Double Deluxe", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/double-deluxe.jpg`, price: 3.50, weight: "180 g" },
        { title: "Spicy Burger", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/spicy-burger.jpg`, price: 4.20, weight: "160 g" },
        { title: "Triple Deluxe", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/triple-deluxe.jpg`, price: 3.70, weight: "200 g" },
        { title: "Cheesemelt Burger", imageUrl: `${process.env.PUBLIC_URL}/images/burgers/cheesemelt-burger.jpg`, price: 4.50, weight: "190 g" }
    ];


    const pastas = [
        { title: "Aglio Olio", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/aglio-olio.jpg`, price: 5.00, weight: "200 g" },
        { title: "Alfredo Pasta", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/alfredo-pasta.jpg`, price: 5.50, weight: "220 g" },
        { title: "Bolognese", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/bolognese.jpg`, price: 4.50, weight: "180 g" },
        { title: "Carbonara", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/carbonara.jpg`, price: 6.00, weight: "210 g" },
        { title: "Lasagna", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/lasagna.jpg`, price: 5.00, weight: "200 g" },
        { title: "Mac and Cheese", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/mac-and-cheese.jpg`, price: 5.50, weight: "200 g" },
        { title: "Pesto", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/pesto.jpg`, price: 4.50, weight: "200 g" },
        { title: "Ravioli", imageUrl: `${process.env.PUBLIC_URL}/images/pasta/ravioli.jpg`, price: 5.00, weight: "200 g" }
    ];


    const pizzas = [
        { title: "Margherita", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/bbqChicken.jpg`, price: 7.00, weight: "400 g" },
        { title: "Creamy Veggie Pizza", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/creamy-veggie-pizza.jpg`, price: 8.00, weight: "420 g" },
        { title: "Margherita", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/margherita.jpg`, price: 9.00, weight: "450 g" },
        { title: "Pepperoni", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/pepperoni.jpg`, price: 7.50, weight: "400 g" },
        { title: "Pepperoni and Sausage", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/pepperoni-and-sausage.jpg`, price: 7.50, weight: "400 g" },
        { title: "Supreme", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/supreme.jpg`, price: 7.50, weight: "400 g" },
        { title: "Vegetarian Delight", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/vegetarian-delight-pizza.jpg`, price: 7.50, weight: "400 g" },
        { title: "Veggie Deluxe", imageUrl: `${process.env.PUBLIC_URL}/images/pizza/veggieDeluxe.jpg`, price: 7.50, weight: "400 g" }

    ];


    const mainCourse = [
        { title: "Beef Brisket", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/beef-brisket.jpg`, price: 7.00, weight: "400 g" },
        { title: "Beef Kebab", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/beef-kebab.jpg`, price: 8.00, weight: "420 g" },
        { title: "Paella", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/Paella.jpg`, price: 9.00, weight: "450 g" },
        { title: "Spicy Beef Stir Fry", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/spicy-beef-stir-fry.jpg`, price: 7.50, weight: "400 g" },
        { title: "Steak", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/steak.jpg`, price: 9.00, weight: "450 g" },
        { title: "Stir Fried Rice Bowl", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/stir-fried-rice-bowl.jpg`, price: 9.00, weight: "450 g" },
        { title: "Sweet and Sour Pork", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/sweet-and-sour-pork.jpg`, price: 9.00, weight: "450 g" },
        { title: "Tofu Stir Fry", imageUrl: `${process.env.PUBLIC_URL}/images/main_course/tofu-stir-fry.jpg`, price: 9.00, weight: "450 g" }
    ];

    const sandwich = [
        { title: "BLT Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/blt.jpg`, price: 7.00, weight: "400 g" },
        { title: "Clubhouse Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/clubHouse.jpg`, price: 8.00, weight: "420 g" },
        { title: "Sunny Side Up Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/egg.jpg`, price: 9.00, weight: "450 g" },
        { title: "Grilled Cheese", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/grilledCheese.jpg`, price: 7.50, weight: "400 g" },
        { title: "Ham Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/ham.jpg`, price: 9.00, weight: "450 g" },
        { title: "Roast Beef Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/roastBeef.jpg`, price: 9.00, weight: "450 g" },
        { title: "Tuna Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/tuna.jpg`, price: 9.00, weight: "450 g" },
        { title: "Turkey and Avocado Sandwich", imageUrl: `${process.env.PUBLIC_URL}/images/sandwich/turkeyAvocado.jpg`, price: 9.00, weight: "450 g" }
    ];

    const taco = [
        { title: "Baja Fish Tacos", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/baja-fish-tacos.jpg`, price: 7.00, weight: "400 g" },
        { title: "Beef Birria", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/birria.jpg`, price: 8.00, weight: "420 g" },
        { title: "Chipotle Salmon", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/chipotle-salmon.jpg`, price: 9.00, weight: "450 g" },
        { title: "Praw and Avocado with Lime Crema", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/Prawn-tacos-with-avocado-and-lime-crema.jpg`, price: 7.50, weight: "400 g" },
        { title: "Shredded Beef", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/shredded-beef-tacos.jpg`, price: 9.00, weight: "450 g" },
        { title: "Tacos Al Pastor", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/Tacos-al-Pastor.jpg`, price: 9.00, weight: "450 g" },
        { title: "Tacos De Barbacoa", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/tacos-de-barbacoa.jpg`, price: 9.00, weight: "450 g" },
        { title: "Vegan Zucchini and Black Bean", imageUrl: `${process.env.PUBLIC_URL}/images/tacos/veganZucchiniAndBlackBean.jpg`, price: 9.00, weight: "450 g" }
    ];

    const pastries = [
        { title: "Bacon and Cheese Donut", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/bacon-and-cheese-donut.jpg`, price: 7.00, weight: "400 g" },
        { title: "Chocolate Cupcake", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/chocolate-cupcake.jpg`, price: 8.00, weight: "420 g" },
        { title: "Chocolate Hazelnut Delight Cupcake", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/chocolate-hazelnut-delight-cupcake.jpg`, price: 9.00, weight: "450 g" },
        { title: "Cinnamon Rolls", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/cinnamon-rolls.jpg`, price: 7.50, weight: "400 g" },
        { title: "Cream Puffs", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/cream-puffs.jpg`, price: 9.00, weight: "450 g" },
        { title: "Lemon Meringue Pie", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/lemon-meringue-pie.jpg`, price: 9.00, weight: "450 g" },
        { title: "Macarons", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/macarons.jpg`, price: 9.00, weight: "450 g" },
        { title: "Purple Yam Mousse Bar", imageUrl: `${process.env.PUBLIC_URL}/images/pastries/purple-yam-mousse-bar.jpg`, price: 9.00, weight: "450 g" }
    ];

    // Add more arrays for other categories as needed


    const getItemsForCategory = (category: string) => {
        switch (category) {
            case 'Burger':
                return burgers;
            case 'Pasta':
                return pastas;
            case 'Pizza':
                return pizzas;
            case 'Main Course':
                return mainCourse;
            case 'Sandwich':
                return sandwich;
            case 'Taco':
                return taco;
            case 'Pastry':
                return pastries;

            // Add more cases for other categories
            default:
                return [];
        }
    };


    const items = getItemsForCategory(activeCategory);

    const handleQuantityChange = (index: number, amount: number) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = Math.max(0, newQuantities[index] + amount);
            //console.log(`Quantity for item ${index}: ${newQuantities[index]}`); // Debugging log
            return newQuantities;
        });
    };


    const calculateTotalPrice = (cart: CartItem[]): number => {
        return cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
    };


    const addToCart = (index: number) => {
        const items = getItemsForCategory(activeCategory);
        const item = items[index];
        const quantity = quantities[index]; // Quantity specified by user
    
        console.log(`Quantity for item ${index}: ${quantity}`); // Debugging log
    
        if (quantity > 0) { // Ensure item is only added if quantity is > 0
            setCart(prevCart => {
                const existingItemIndex = prevCart.findIndex(cartItem => cartItem.title === item.title);
    
                let newCart;
                if (existingItemIndex !== -1) {
                    // Item already in cart, increment quantity
                    newCart = prevCart.map((cartItem, i) =>
                        i === existingItemIndex
                            ? { ...cartItem, quantity: cartItem.quantity + quantity }
                            : cartItem
                    );
                } else {
                    // Item not in cart, add new item
                    newCart = [...prevCart, { ...item, quantity }];
                }
    
                console.log("Cart contents:", newCart); // Log the updated cart
    
                // Calculate and update the total price
                const newTotalPrice = calculateTotalPrice(newCart);
                setTotalPrice(newTotalPrice);
                console.log("Total price:", newTotalPrice);
    
                return newCart;
            });
    
            // Reset the quantity for the added item
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = 0; // Reset the input field quantity to 0
                return newQuantities;
            });
        }
    };

    /*
    useEffect(() => {
        console.log("Cart contents:", cart);
    }, [cart]);
    */




    const toggleCartModal = () => {
        setIsCartModalOpen(!isCartModalOpen);
    };

    const handleRemoveItem = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);

        // Calculate and update the total price
        const newTotalPrice = calculateTotalPrice(newCart);
        setTotalPrice(newTotalPrice);
        console.log("Total price:", newTotalPrice);
    };

    const handleUpdateQuantity = (index: number, quantity: number) => {
        const newCart = [...cart];
        if (quantity <= 0) {
            newCart.splice(index, 1);
        } else {
            newCart[index].quantity = quantity;
        }
        
        setCart(newCart);

        // Calculate and update the total price
        const newTotalPrice = calculateTotalPrice(newCart);
        setTotalPrice(newTotalPrice);
        console.log("Total price:", newTotalPrice);
    };


    return (
        <div className="app">
            <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            <button className= "view-cart-button" onClick={toggleCartModal}>View Cart</button>

            <div className="food-list">
                {items.map((item, index) => (
                    <FoodCard
                        key={index}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        weight={item.weight}
                        isActive={index === activeIndex}
                        quantity={quantities[index]}
                        onClick={() => setActiveIndex(index)}
                        onQuantityChange={(amount: number) => handleQuantityChange(index, amount)}
                        onAddToCart={() => addToCart(index)}
                    />
                ))}
            </div>

                        
            

            {
            
            isCartModalOpen && (
                <CartModal
                    cart={cart} 
                    totalPrice={totalPrice} 
                    onClose={toggleCartModal}
                    onRemoveItem={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            )
            

            }

        </div>
    );
}

export default App;