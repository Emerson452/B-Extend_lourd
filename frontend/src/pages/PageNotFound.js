import React from 'react';
import {Link} from "react-router-dom";
import error from "../assets/error.png";


function PageNotFound() {
  return (
    <div className='errorContainer'>
        <img src={error} alt='logo-error' className='lmj-logo' />
        <h3>Retourner à l'<Link to="/">accueil.</Link></h3>
    </div>
  )
}

export default PageNotFound