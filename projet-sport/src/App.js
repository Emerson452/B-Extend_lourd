//Banner
import './styles/Banner.css'
import logo from './assets/logo.png'
import panier from './assets/panier-blanc.png'
import User from './assets/user.png'

import "./styles/First.css";
import "./styles/index.css";
import "./styles/Posts.css";
import "./styles/Login.css";
import "./styles/Panier.css";
import "./styles/PageNotFound.css";
import "./styles/Profil.css";
import "./styles/Gestion.css";

import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import First from './pages/First';
import Panier from './pages/Panier';
import CreatePost from './pages/CreatePost';
import ZoomPost from './pages/ZoomPost';
import ZoomUser from './pages/ZoomUser';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Gestion from './pages/Gestion';

import PageNotFound from './pages/PageNotFound';
import Footer from './components/footer';
import { AuthContext} from "./helpers/AuthContext";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    surname: "",
    name: "",
    telephone: "",
    email: "",
    id: 0,
    admin:false,
    status: false,
  }); //le fait que nous sommes connecté ou non est basée sur cet état(authState)

  const[user, setUser] = useState({
    email:"",
    surname:"",
    admin:false,
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          
          console.log("erreur accesstoken")
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            surname: response.data.surname,
            name: response.data.name,
            telephone: response.data.telephone,
            email: response.data.email,
            id: response.data.id,
            admin: response.data.admin,
            status: true,
          });

          const id = response.data.id;
          axios
          .get(`http://localhost:3001/auth/byId/${id}`)
            .then((response) => {
              console.log("erreur by id ");
              if (response.data.error) {
                setUser({ ...user, admin: false });
        } else {
          // localStorage.setItem("admin", response.data.admin);
          setUser({
            email: response.data.email,
            admin: response.data.admin
          });
        }
      });
    }
  });
  }, []);

//Déconnexion
const logout = () => {
  localStorage.removeItem("accessToken");
  setAuthState({ surname: "", id: 0, status: false });
};
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
      <div className='banner'>

		<img src={logo} alt='logo-b-extend' className='lmj-logo' />
		<ul>
      <Link to="/first">ACCUEIL</Link>
			<Link to="/">LOCATION</Link>
      
      {authState.admin === true &&
      <>
      <Link to="/createpost">CRÉER UNE LOCATION</Link>
      <Link to="/gestion">GESTION</Link>
      </>
      }
			{!authState.status && ( //nous demandons si le state est égal à false (non connexté)
				<>
			<Link to="/login">CONNEXION</Link>
			<Link to="/registration" >INSCRIPTION</Link>
				</>
        
			)}
        {authState.status && <Link to="/" onClick={logout}>DECONNEXION</Link>}			
		</ul>
		<div className='profil'>
    <h3>Bonjour {authState.surname}</h3>
    <div className='logoBanner'>
		<Link to="/profil/${id}"><img src={User} alt='profil' className='user-logo' /></Link>
		<Link to="/panier"><img src={panier} alt='profil' className='panier-logo' /></Link>
		</div>
    </div>
	</div>
        <Routes>
          <Route path="/first" exact element={<First />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/panier" exact element={<Panier />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<ZoomPost />} />
          <Route path="/auth/:id" exact element={<ZoomUser />} />

          <Route path="/gestion" exact element={<Gestion />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profil/:id" exact element={<Profil />} />
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </Router>
      
      </AuthContext.Provider>
      <Footer>
      </Footer>
    </div>
  );
}

export default App;
