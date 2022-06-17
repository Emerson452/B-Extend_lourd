import React from 'react'

function Panier(){
    return(
        <div></div>
    )
}

export default Panier;

// import { useState, useEffect } from 'react'
// import '../styles/Cart.css'
// import poubelle from '../assets/poubelle.png'

// function Cart({ cart, updateCart }) {
// 	const [isOpen, setIsOpen] = useState(true)
// 	const total = cart.reduce(
// 		(acc, plantType) => acc + plantType.amount * plantType.price,
// 		0
// 	)
// 	useEffect(() => {
// 		document.title = `LMJ: ${total}€ d'achats`
// 	}, [total])

// 	return isOpen ? (
// 		<div className='lmj-cart'>
// 			<button
// 				className='lmj-cart-toggle-button'
// 				onClick={() => setIsOpen(false)}
// 			>
// 				Fermer
// 			</button>
// 			{cart.length > 0 ? (
// 				<div>
// 					<h2>Panier</h2>
// 					<hr></hr>
// 					<ul>
// 						{cart.map(({ name, price, amount }, index) => (
// 							<div key={`${name}-${index}`}>
// 								{name} {price}€ x {amount}
// 							</div>
// 						))}
// 					</ul>
// 					<hr></hr>
// 					<h3>Total :{total}€</h3>
// 					<img  onClick={() => updateCart([])} src={poubelle} alt='profil' className='poubelle-logo' />

// 				</div>
// 			) : (
// 				<div>Votre panier est vide</div>
// 			)}
// 		</div>
// 	) : (
// 		<div className='lmj-cart-closed'>
// 			<button
// 				className='lmj-cart-toggle-button'
// 				onClick={() => setIsOpen(true)}
// 			>
// 				Ouvrir
// 			</button>
// 		</div>
// 	)
// }

// export default Cart
