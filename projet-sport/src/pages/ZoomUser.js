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

    const editUser = (option) => {
        if (option === "surname") {
          let newSurname = prompt("Nouveau prénom: ");
          if (newSurname) {
            axios.put(
              "http://localhost:3001/auth/surname",
              {
                newSurname: newSurname,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setUserObject({ ...userObject, surname: newSurname });
          }
        }
        if (option === "name") {
          let newName = prompt("Nouveau nom: ");
          if (newName) {
            axios.put(
              "http://localhost:3001/auth/name",
              {
                newName: newName,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setUserObject({ ...userObject, name: newName });
          }
        }
        if (option === "telephone") {
          let newTelehone = prompt("Nouveau telephone: ");
          if (newTelehone) {
            axios.put(
              "http://localhost:3001/auth/telephone",
              {
                newPhone: newTelehone,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setUserObject({ ...userObject, telephone: newTelehone });
          }
        }
        if (option === "email") {
          let newEmail = prompt("Nouveau email: ");
          if (newEmail) {
            axios.put(
              "http://localhost:3001/auth/email",
              {
                newEmail: newEmail,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setUserObject({ ...userObject, email: newEmail });
          }
        }
      };
  
  return (
    <div className="postPageProfil">
    <div className="leftSideProfil">

    </div>
    <div className="rightSide">
      <div className="basicInfo">
      <h2> Prénom: {userObject.surname}<button className='btnModif' onClick={() => {editUser("surname")}}>Modifier prénom</button></h2>
      <h2> Name: {userObject.name}<button className='btnModif' onClick={() => {editUser("name")}}>Modifier nom</button></h2>
      <h2> Email: {userObject.email}<button className='btnModif' onClick={() => {editUser("email")}}>Modifier email</button></h2>
      <h2> Telephone: {userObject.telephone}<button className='btnModif' onClick={() => {editUser("telephone")}}>Modifier telephone</button></h2>

      {authState.admin ? (
      <>
      </>
      ) : (
      <>
      <h6>Vous n'êtes pas Administrateur.</h6>
      </>
      )

      }
      </div>
      {authState.status &&
      <>
      <div className='btnPost'>
        <button onClick={() => {deleteUser(userObject.id);}}>{""}Supprimer</button>
      </div>
      </>
      }
    </div>
  </div>
);

}


export default ZoomUser;