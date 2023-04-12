import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';//crochet d'utilisation des paramètres 
import axios from 'axios';
import '../styles/ZoomPost.css';
import { AuthContext } from "../helpers/AuthContext";



function ZoomUser() { 
    let { id } = useParams();//obtenir la valeur que nous passons dans nos paramètres
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);


  //afficher les données 
  const [userObject, setUserObject] = useState({});

    useEffect(() => { //récupérer les données basées sur cet identifiant = useEffect hook
        axios.get(`http://localhost:3001/auth/information/${id}`).then((response) => {//ce que nous faisons après avoir reçu les données
          //comment afficher les données
          setUserObject(response.data);

        },
      );
  }, []);

    useEffect(() =>{
      if (!authState.status) {
          navigate("/login");
      }
  }, []);
    const deleteUser = (id) => {
      axios
      .delete(`http://localhost:3001/auth/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken")},
      })
      
      .then(() =>{
        navigate("/gestion");
       alert("delete success") 
      });
    };

  return (
    <div className="postPageProfil">
    <div className="leftSideProfil">

    </div>
    <div className="rightSide">
      <div className="basicInfo">
      <h2> Prénom: {userObject.surname}</h2>
      <h2> Name: {userObject.name}</h2>
      <h2> Email: {userObject.email}</h2>
      <h2> Telephone: {userObject.telephone}</h2>
      </div>
      {authState.status &&
      <>
      <div className='btnPost'>
      <button onClick={() => {navigate(`/modifprofil/${id}`)}}>{""}Modifier</button>
        <button onClick={() => {deleteUser(userObject.id);}}>{""}Supprimer</button>
      </div>
      </>
      }
    </div>
  </div>
);

}


export default ZoomUser;