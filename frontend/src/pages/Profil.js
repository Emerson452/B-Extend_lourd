import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";


function Profil() {
    let {id} = useParams(); // chaque req = récup id a partir des params dans le back (users)
    // const [surname, setSurname] = useState(""); // état contenant les infor sur le users
    const { authState } = useContext(AuthContext);
    const [userObject, setUserObject] = useState({});

    let navigate = useNavigate();

    
    useEffect(() => { // il sera exécuter quand on ouvre la page ce qui lancera toutes les req pour construire la page
        axios.get(`http://localhost:3001/auth/information/${id}`).then((response) => {
          setUserObject(response.data);
            console.log(authState);
        })
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
        window.location.reload();
        localStorage.clear();
        navigate("/");
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
                {" "}
                <h2> Prénom: {authState.surname}<button className='btnModif' onClick={() => {editUser("surname")}}>Modifier prénom</button></h2>
                <h2> Name: {authState.name}<button className='btnModif' onClick={() => {editUser("name")}}>Modifier nom</button></h2>
                <h2> Telephone: {authState.telephone}<button className='btnModif' onClick={() => {editUser("telephone")}}>Modifier telephone</button></h2>
                <h2> Email: {authState.email}<button className='btnModif' onClick={() => {editUser("email")}}>Modifier email</button></h2>
                

                {authState.admin ? (
                <>
                <h4>Droit Administrateur</h4>
                </>
                ) : (
                <>
                <h6>Droit Utilisateur</h6>
                </>
                )

                }
                </div>
                {authState.status &&
                <>
                <div className='btnPost'>
                <button onClick={() => {navigate(`/modifprofil/${id}`)}}>{""}Modifier</button>

                  <button onClick={() => {deleteUser(authState.id);}}>{""}Supprimer</button>
                </div>
                </>
                }
              </div>
            </div>
          );
        }

export default Profil;