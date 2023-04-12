import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Gestion() {
  const { authState } = useContext(AuthContext);
  const [listOfUsers, setListOfUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/auth").then((response) => {
      //ce que nous faisons après avoir reçu les données
      setListOfUsers(response.data);
      console.log(setListOfUsers);

    });
  }, []);

  return (
    <div>
      <div className="titleGestion">
              <h2>Id</h2>
              <h2>Surnom</h2>
              <h2>Nom</h2>
              <h2>Telephone</h2>
              <h2>Email</h2>
              <h2></h2>
              <h2></h2>
              <h2></h2>
            </div>
      {listOfUsers.map((value, key) => {
        
        return (
          <div className="gestionPage" key={key}>
            
          <div className="containerGestion">
            {authState.admin ? (
              <>
              <div>{value.id}</div>
              <div>{value.surname}</div>
              <div>{value.name}</div>
              <div>{value.telephone}</div>
              <div>{value.email}</div>
              <button onClick={() => {navigate(`/auth/${value.id}`);}}>Détails</button>             
              </>
            ) : (
              <>
              <div className="noAdmin"><h1>Vous n'êtes pas Administrateur.</h1></div>
              </>
            )}
          </div>
          </div>
        );
        
      })}
      
    </div>
  );
}

export default Gestion;
