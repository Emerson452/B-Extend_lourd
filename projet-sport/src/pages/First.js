import React from 'react'
import {Link} from "react-router-dom";


function First(){
    return(
        <div className="containerFirst">
            <h1>B-EXTEND</h1>
            <hr></hr>
            <h3>Basketball is not just a passion.</h3>
            <h4><Link to="/">Parcourir</Link></h4>
        </div>
    )
}

export default First;