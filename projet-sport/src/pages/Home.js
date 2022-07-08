import React from "react";
import axios from "axios"; //req  get request in Home
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // hook d'history
import "../styles/ShoppingList.css";

function Home({ cart, updateCart }) {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate(); //quand vous êtes sur une route et que vous voulez passer à une autre il suffit d'appaler history.push
  //  const list = JSON.parse(localStorage.getItem("panier"));

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      //ce que nous faisons après avoir reçu les données
      setListOfPosts(response.data);
    });
  }, []);

  //PANIER//
  function savePanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier)); // transformer un objet complexe en une chaine de chara
  }

  function getPanier() {
    // return JSON.parse(localStorage.getItem("panier")); // permet de transformer la chaine de chara a nouveau en objet complexe
    let panier = localStorage.getItem("panier");
    if (panier == null) {
      return []; //retourner un tableau vide car le panier est vide
    } else {
      return JSON.parse(panier); // permet de transformer la chaine de chara a nouveau en objet complexe
    }
  }



    let quantity = 0;
  return (
    <div className="shopping-list">
      <div className="article">
        {listOfPosts.map((value, key) => {
          const addPanier = () => {
            let panier = getPanier();
    //Pouvoir gérer la quantité
    console.log(panier)
    let foundProduct = panier.find(
      (productInPanier) => productInPanier.id === value.id
      
    ); //find = fonction qui permet de chercher un élément dans un tableau par rapport a une condition
    if (foundProduct !== undefined) {
      // si il est différent de undefined = il éxiste déjà dans le panier
      foundProduct.quantity++; //Donc j'ajoute 1 à la quantité
      window.location.reload();
      if (foundProduct.quantity > value.stock) {
        foundProduct.quantity = value.stock; //la qtt du prod ne peut être plus grand que la value du stock
      }
      localStorage.setItem(value.id, foundProduct.quantity);//??????????
    } else {
      value.quantity = 1; //sinon je définie une quantité par défaut à 1 pour mon produit
      panier.push(value); // dans le localstorage on peut pas enregistré de donnée complexe = tableau/objet, seulement chaine chara/entier etc donc on utilise la sérialisation
      localStorage.setItem(value.id, value.quantity)
      window.location.reload();
    }
    savePanier(panier);
    quantity = JSON.parse(localStorage.getItem(value.id));
  };

          return (
            <div className="post" key={key}>
              <div className="title"> {value.title} </div>
              <div className="body"> {value.description} </div>
              <div className="stock"> Plus que {value.stock} ! </div>
              <div className="price"> {value.price} €</div>
              <div className="btnPost">
                <button className="btnPost" onClick={() => {navigate(`/post/${value.id}`);}}>
                  Détails
                </button>

                <button type="submit" className="btnPost" onClick={addPanier}>
                  Ajouter au panier
                </button>
              <div className="onchangeHome">
                <p onChange={addPanier}>
                  {JSON.parse(localStorage.getItem(value.id))}
                </p>
              </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Home;
