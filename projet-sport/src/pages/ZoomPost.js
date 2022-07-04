import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';//crochet d'utilisation des paramètres 
import axios from 'axios';
import '../styles/ZoomPost.css';
import { AuthContext } from "../helpers/AuthContext";



function Post() { 
    let { id } = useParams();//obtenir la valeur que nous passons dans nos paramètres
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);


  //afficher les données 
  const [postObject, setPostObject] = useState({});

    useEffect(() => { //récupérer les données basées sur cet identifiant = useEffect hook
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {//ce que nous faisons après avoir reçu les données
          //comment afficher les données
          setPostObject(response.data);
          console.log(response.data);
        },

        // {
        // headers: {
        //   accessToken: localStorage.getItem("accessToken"),
        // }}
        
        );
    }, []);

  //   useEffect(() =>{
  //     if (!authState.admin) {
  //         navigate("/login");
  //     }
  // }, []);
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
      <div className='titlePost'>{postObject.title}</div>
      <div className='descriptionPost'>{postObject.description}</div>
    </div>
    <div className='rightSide'>
      <div className='stockPost'>{postObject.stock}</div>
      <div className='pricePost'>{postObject.price}</div>
      <button>Modifier</button>
      <button onClick={() => {deletePost(postObject.id);}}>{""}Supprimer</button>
    </div>
    </div>
  )
}

export default Post