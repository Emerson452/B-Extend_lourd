import React, {useState, useContext} from 'react';
import axios from "axios";
import { AuthContext} from "../helpers/AuthContext"
import { useNavigate} from "react-router-dom";

function Login() {
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const{setAuthState} = useContext(AuthContext);
    let navigate = useNavigate();

    const login = () => {
        const data = {email: email, password: password};
        axios.post("http://localhost:3001/auth/login", data).then((response) =>{
            if (response.data.error) {
                alert(response.data.error);
            } else {
                //Si il n'y a pas d'erreur 
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
                email: response.data.email,
                id: response.data.id,
                status: true,
            });
            const id = response.data.id;
            axios.get(`http://localhost:3001/auth/byId/${id}`).then((response) => {
                if (response.data.error){
                    alert(response.data.error);
                } else {
                    localStorage.setItem("admin", response.data.admin);
                    setAuthState({
                        email: response.data.email,
                        admin: response.data.admin,
                    });
                }
            })
            navigate("/");
            window.location.reload();
            }
        }); //req à notre route de connextion
    };
  return (
    <div className='Loginform'>
        <h1>Login</h1>
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