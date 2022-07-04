import React from 'react';
import axios from "axios"; //req  get request in Home
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // hook d'history
import '../styles/ShoppingList.css'
import Panier from './Panier';

function Home({ cart, updateCart }) {
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate(); //quand vous êtes sur une route et que vous voulez passer à une autre il suffit d'appaler history.push
   const list = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
          //ce que nous faisons après avoir reçu les données
          setListOfPosts(response.data);
        });
      }, []);

      // function Modifier ({}) {

      // }
      
  return (
    <div className='shopping-list'>
      <div className='article'>
        {listOfPosts.map((value, key) => {
          // panier.push(value)
          
        return (
          <div className="post" key={key}> 
            <div className="title"> {value.title} </div>
            <div className="body"> {value.description} </div>
            <div className="stock"> Plus que {value.stock} ! </div>
            <div className="price"> {value.price} €</div>
              <div className="containerbtn">
                <button className='btnPost' onClick={() => {navigate(`/post/${value.id}`)}}>Détails</button>

                <form action='/panier' method='POST'>
                  <input type="hidden" name="id" value="<%=p.id%>"></input>
                <button type="submit" className='btnPost' onClick={Panier}>Ajouter au panier</button>

                </form>
              </div>
          </div>
          
        );
      })}
      </div>
      <div className='panier'>
        <button>open</button>
      </div>
    </div>
  );
}

export default Home;