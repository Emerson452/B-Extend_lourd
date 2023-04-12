import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; //crochet d'utilisation des paramètres
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Panier() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  let list = JSON.parse(localStorage.getItem("panier"));
  let length = list.length;
  let listPost = [];
  let totalPrice = 0;
  let price = 0;
  let post = [];


  for (var px = 0; px < length; px++) {
    price = Number(list[px].price) * list[px].quantity;
    totalPrice = totalPrice + price;
    listPost.push(list[px]);
  }

  const Empty = () => {
    list = [];
    localStorage.clear();
    navigate("/");
  };

  const Send = () => {
    list = [];
    listPost.map((value) => {
      let newStock = value.stock - value.quantity;
      let id = value.id;
      post.push({ id: value.id, newStock: newStock });
      console.log(post);
      localStorage.setItem("newStock", JSON.stringify(post));
      axios.put(
        "http://localhost:3001/posts/stock",
        {
          newStock: newStock,
          id: id,
        },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      );
      window.location.reload();
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="containerPanier">
      <div className="titlePanier">
        <h2>Panier</h2>
        <h2>Prix</h2>
      </div>
      
        {listPost.map((value, key) => {
          return (
              <div className="cart" key={key}>
                <div className="leftCartPanier"></div>
                <div className="rightCartPanier">
                  <div className="titleCartPanier">
                    <p>{value.title}</p>
                    <p>{value.description}</p>
                    <p>Quantité: {value.quantity} !</p>
                  </div>
                  <div className="priceCartPanier">
                    <p>Prix: {value.price} €</p>
                  </div>
                </div>
              </div>
          );
        })}
        <div className="footerPanier">
          <p className="totalPanier">Total price: {totalPrice} €</p>
       
<div className="btnPanier">
        <button onClick={Empty}>Empty the cart</button>
        <button onClick={Send}>Validate the cart</button>
        </div>
      </div>
    </div>
  );

}

export default Panier;
