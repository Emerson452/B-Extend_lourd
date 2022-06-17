//Banner
import './styles/Banner.css'
import logo from './assets/logo.png'
import user from './assets/user.png'
import panier from './assets/panier-blanc.png'

import "./styles/First.css";
import "./styles/index.css";
import "./styles/Posts.css";
import "./styles/Login.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import First from './pages/First';
import Panier from './pages/Panier';
import CreatePost from './pages/CreatePost';
import ZoomPost from './pages/ZoomPost';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Footer from './components/footer';
import { AuthContext} from "./helpers/AuthContext";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {
const [authState, setAuthState] = useState(false); //le fait que nous sommes connecté ou non est basée sur cet état(authState)

useEffect (() => {
  // if (localStorage.getItem('accessToken')){ //peut être facilement trucké en mettant un token aléatoire donc nous faisont une req avec axios
  //   setAuthState(true);
  // }
  axios.get('http://localhost:3001/auth/auth', {
    headers:{
     accessToken: localStorage.getItem("accessToken"),
  },
}).then((response) =>{
    if (response.data.error){
      setAuthState(false);
    } else {
      setAuthState(true);
    }
  });
}, []);

//Déconnexion
const logout = () => {
	localStorage.removeItem("accessToken");
	setAuthState(false);
};
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
      <div className='lmj-banner'>
		<img src={logo} alt='logo-b-extend' className='lmj-logo' />
		<ul>
    <Link to="/first">ACCUEIL</Link>
			<Link to="/">LOCATION</Link>
      <Link to="/panier">PANIER</Link>
      <Link to="/createpost">CRÉER UNE LOCATION</Link>
      <Link to="/gestion">GESTION</Link>
			{!authState ? ( //nous demandons si le state est égal à false (non connexté)
				<>
			<Link to="/login">CONNEXION</Link>
			<Link to="/registration">INSCRIPTION</Link>
				</>
			):(
				<button onClick={logout}>DECONNEXION</button>
			 
			)
			}
		</ul>
		<div className='profil'>
		<Link to="/profil"><img src={user} alt='profil' className='user-logo' /></Link>
		<Link to="/panier"><img src={panier} alt='profil' className='panier-logo' /></Link>
		</div>
	</div>
        <Routes>
          <Route path="/first" exact element={<First />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/panier" exact element={<Panier />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<ZoomPost />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
      
      </AuthContext.Provider>
      <Footer>
      </Footer>
    </div>
  );
}

export default App;
