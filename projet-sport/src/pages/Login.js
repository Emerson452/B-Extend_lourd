import React, {useState} from 'react';
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = {email: email, password: password};
        axios.post("http://localhost:3001/auth/login", data).then((response) =>{
            if (response.data.error) {
                alert(response.data.error);
            } else {
                //Si il n'y a pas d'erreur 
            sessionStorage.setItem("accessToken", response.data);
            }
        }); //req à notre route de connextion
    };
  return (
    <div>
        <input 
        type="text" 
        onChange={(event) =>{
            setEmail(event.target.value);
        }}
        />
        <input 
        type="password"
        onChange={(event) =>{
            setPassword(event.target.value);
        }}
        />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login