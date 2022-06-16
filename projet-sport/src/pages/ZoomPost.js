import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'//crochet d'utilisation des paramètres 
import axios from 'axios'
import '../styles/ZoomPost.css';

function Post() { 
    let { id } = useParams();//obtenir la valeur que nous passons dans nos paramètres

  //afficher les données 
  const [postObject, setPostObject] = useState({});

    useEffect(() => { //récupérer les données basées sur cet identifiant = useEffect hook
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {//ce que nous faisons après avoir reçu les données
          //comment afficher les données
          setPostObject(response.data);
        });
    });
  return (
  <div className='postPage'>
    <div className='leftSide'>
      <div className='titlePost'>{postObject.title}</div>
      <div className='descriptionPost'>{postObject.description}</div>
    </div>
    <div className='rightSide'>
      <div className='stockPost'>{postObject.stock}</div>
      <div className='pricePost'>{postObject.price}</div>
    </div>
    </div>
  );
}

export default Post