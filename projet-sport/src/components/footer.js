import '../styles/Footer.css'
import logo from '../assets/logo.png'

function Footer() {

	return (
		<footer className='lmj-footer'>
			<div className='logo-footer'>
				<img src={logo} alt='logo-la-maison-jungle' className='lmj-logo' />
			</div>
			<div className='lmj-footer-elem'>
				Pour les passionné·e·s de Basketball
			</div>
			<div className='copyright'></div>
		</footer>
		
	)
}

export default Footer
