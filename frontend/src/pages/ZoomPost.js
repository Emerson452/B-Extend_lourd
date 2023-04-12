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

  return (
  <div className='postPage'>
    <div className='leftSide'>
    </div>
    <div className='rightSide'>
      <h2>{postObject.title}</h2>

      <h4>{postObject.description}</h4>

      <div className='infoPost'>
        <p>Stock: {postObject.stock} !</p>

        <p>Prix: {postObject.price} €</p>

      </div>
      {authState.admin === true && ( //nous demandons si le state est égal à false (non connexté)
				<>
		<div className='btnPost'>
    <button onClick={() => {navigate(`/modifpost/${id}`)}}>{""}Modifier</button>
      <button onClick={() => {deletePost(postObject.id);}}>{""}Supprimer</button>

      </div>
				</>
        
			)}
      
      
    </div>
    </div>
  )

}


export default ZoomPost