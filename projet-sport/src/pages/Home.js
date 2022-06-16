import React from 'react';
import axios from "axios"; //req  get request in Home
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // hook d'history

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate(); //quand vous êtes sur une route et que vous voulez passer à une autre il suffit d'appaler history.push
    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
          //ce que nous faisons après avoir reçu les données
          setListOfPosts(response.data);
        });
      }, []);

  return (
    <div className='shopping-list'>
      <div className='article'>
        {listOfPosts.map((value, key) => {
        return (
          <div className="post"> 
            <div className="title"> {value.title} </div>
            <div className="body"> {value.description} </div>
            <div className="stock"> Plus que {value.stock} ! </div>
            <div className="price"> {value.price} €</div>
              <div className="containerbtn">
                <button className='btnPost' onClick={() => {navigate(`/post/${value.id}`)}}>Détails</button>
                <button className='btnPost'>Ajouter au panier</button>
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