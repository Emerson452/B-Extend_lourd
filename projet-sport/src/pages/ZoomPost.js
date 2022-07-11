import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';//crochet d'utilisation des paramètres 
import axios from 'axios';
import '../styles/ZoomPost.css';
import { AuthContext } from "../helpers/AuthContext";



function ZoomPost() { 
    let { id } = useParams();//obtenir la valeur que nous passons dans nos paramètres
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);


  //afficher les données 
  const [postObject, setPostObject] = useState({});

    useEffect(() => { //récupérer les données basées sur cet identifiant = useEffect hook
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {//ce que nous faisons après avoir reçu les données
          //comment afficher les données
          setPostObject(response.data);

        },
      );
  }, []);

    useEffect(() =>{
      if (!authState.status) {
          navigate("/login");
      }
  }, []);
    const deletePost = (id) => {
      axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken")},
      })
      
      .then(() =>{
        navigate("/");
       alert("delete success") 
      });
    };

    const editPost = (option) => {
      if (option === "title") {
        let newTitle = prompt("Nouveau Titre: ");
        if (newTitle) {
          axios.put(
            "http://localhost:3001/posts/title",
            {
              newTitle: newTitle,
              id: id,
            },
            {
              headers: { accessToken: sessionStorage.getItem("accessToken") },
            }
          );
  
          setPostObject({ ...postObject, title: newTitle });
        }
      }
      if (option === "description") {
        let newDescription = prompt("Nouvelle description: ");
        if (newDescription) {
          axios.put(
            "http://localhost:3001/posts/description",
            {
              newDescription: newDescription,
              id: id,
            },
            {
              headers: { accessToken: sessionStorage.getItem("accessToken") },
            }
          );
  
          setPostObject({ ...postObject, description: newDescription });
        }
      }
      if (option === "price") {
        let newPrice = prompt("Nouveau prix: ");
        if (newPrice) {
          axios.put(
            "http://localhost:3001/posts/price",
            {
              newPrice: newPrice,
              id: id,
            },
            {
              headers: { accessToken: sessionStorage.getItem("accessToken") },
            }
          );
  
          setPostObject({ ...postObject, price: newPrice });
        }
      }
      if (option === "stock") {
        let newStock = prompt("Nouveau stock: ");
        if (newStock) {
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
  
          setPostObject({ ...postObject, stock: newStock });
        }
      }
    };
  return (
  <div className='postPage'>
    <div className='leftSide'>
    </div>
    <div className='rightSide'>
      <h2>{postObject.title}<button className='btnModif' onClick={() =>  {editPost("title")}}>Modifier titre.</button></h2>

      <h4>{postObject.description}<button className='btnModif' onClick={() =>  {editPost("description")}}>Modifier description.</button></h4>

      <div className='infoPost'>
        <p>Stock: {postObject.stock} !<button className='btnModif' onClick={() =>  {editPost("stock")}}>Modifier stock.</button></p>

        <p>Prix: {postObject.price} €<button className='btnModif' onClick={() =>  {editPost("price")}}>Modifier prix.</button></p>

      </div>
      {authState.admin === true && ( //nous demandons si le state est égal à false (non connexté)
				<>
		<div className='btnPost'>

      <button onClick={() => {deletePost(postObject.id);}}>{""}Supprimer</button>

      </div>
				</>
        
			)}
      
      
    </div>
    </div>
  )

}


export default ZoomPost