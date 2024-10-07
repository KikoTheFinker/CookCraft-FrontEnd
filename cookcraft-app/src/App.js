import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/AuthenticationComponents/Register';
import Login from './components/AuthenticationComponents/Login';
import ProfileView from "./components/ProfileView";
import Home from "./components/Home";
import './css/index.css';
import Recipes from './components/RecipesComponents/Recipes';
import ApplicationForm from './components/ApplicationForm';
import RecipeCard from "./components/RecipesComponents/RecipeCard";
import About from "./components/About";
import AdminView from "./components/AdminView";
import DeliveryView from "./components/DeliveryView";
import { CartProvider } from './components/ShoppingCartComponents/CartContext'; 
import Checkout from './components/ShoppingCartComponents/Checkout';
import DeliveryDetails from './components/ShoppingCartComponents/DeliveryDetails';
import { OrderProvider } from './components/ShoppingCartComponents/OrderContext';
import OrderNotification from './components/ShoppingCartComponents/OrderNotification';
import DeliveryReview from './components/ShoppingCartComponents/DeliveryReview';
import RecipeApplication from "./components/RecipesComponents/RecipeApplication";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <OrderProvider>
          <OrderNotification />
          <Routes>
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Profile' element={<ProfileView />} />
            <Route path='/' element={<Home />} />
            <Route path='/Recipes' element={<Recipes />} />
            <Route path='/Apply' element={<ApplicationForm />} />
            <Route path="/Recipes/:id" element={<RecipeCard />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/deliver" element={<DeliveryView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery-details" element={<DeliveryDetails />} />
            <Route path="/delivery-review" element={<DeliveryReview />} />
            <Route path="/recipes/add" element={<RecipeApplication />}/>
            <Route path="/loginSuccess" element={<Login />} />
          </Routes>
        </OrderProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
