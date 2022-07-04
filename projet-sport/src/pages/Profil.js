import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Profil() {
    let {id} = useParams(); // chaque req = récup id a partir des params dans le back (users)
    const [surname, setSurname] = useState(""); // état contenant les infor sur le users

    useEffect(() => { // il sera exécuter quand on ouvre la page ce qui lancera toutes les req pour construire la page
        axios.get(`http://localhost:3001/auth/information/${id}`).then((response) => {
            setSurname(response.data.surname);
        })
    }, []);

    return (
        
    <div className="profilPageContainer">
        
        <div className="basicInfo">
            aaaa
            {""}
            <h1>Surname : {surname}</h1>
        </div>
    </div>
    );
}

export default Profil;