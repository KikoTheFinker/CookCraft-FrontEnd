import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProfileView from "./components/ProfileView";
import Home from "./components/Home"
import './css/index.css';
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/profile' element={<ProfileView heading="Settings"/>}></Route>
          <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App