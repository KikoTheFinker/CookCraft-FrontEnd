import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/AuthenticationComponents/Register';
import Login from './components/AuthenticationComponents/Login';
import ProfileView from "./components/ProfileView";
import Home from "./components/Home"
import './css/index.css';
import Recipes from './components/RecipesComponents/Recipes';
import ApplicationForm from './components/ApplicationForm';
import RecipeCard from "./components/RecipesComponents/RecipeCard";
import About from "./components/About";
import AdminView from "./components/AdminView";
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Profile' element={<ProfileView/>}></Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/Recipes' element={<Recipes/>}/>
          <Route path='/Apply' element={<ApplicationForm/>}></Route>
          <Route path="/Recipes/:id" element={<RecipeCard/>}></Route>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/admin" element={<AdminView/>}></Route>
      </Routes>
    </Router>
  )
}

export default App