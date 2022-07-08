import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';


function Gestion() {
    const { authState } = useContext(AuthContext);
    const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/auth").then((response) => {
          //ce que nous faisons après avoir reçu les données
          setListOfUsers(response.data);
          console.log(setListOfUsers);
        });
      }, []);


  return (
    <div>
        {listOfUsers.map((value, key) => {
        <div>{value.surname}Gestion
                <div>{value.email}Gestion</div>
</div>

    })}
    </div>

   ) 
}

export default Gestion