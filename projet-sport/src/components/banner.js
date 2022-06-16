import '../styles/Banner.css'
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import panier from '../assets/panier-blanc.png'
import {Link} from "react-router-dom";

function Banner() {
	return(
	<div className='lmj-banner'>
		<img src={logo} alt='logo-la-maison-jungle' className='lmj-logo' />
		<ul>
			<Link to="/">ACCUEIL</Link>
			<Link to="/">LOCATION</Link>
			<Link to="/createpost">CRÉER UNE LOCATION</Link>
			<Link to="/login">CONNEXION</Link>
			<Link to="/registration">INSCRIPTION</Link>
		</ul>
		<div className='profil'>
		<Link to="/profil"><img src={user} alt='profil' className='user-logo' /></Link>
		<Link to="/panier"><img src={panier} alt='profil' className='panier-logo' /></Link>
		</div>
	</div>
	)
	
}

export default Banner