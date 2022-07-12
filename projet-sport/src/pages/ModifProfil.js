import React, { useContext, useEffect, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik"; // permet de créer des formulaires sans utiliser les balises html traditionnelles
import * as Yup from "yup"; // validation de formulaire (ex: une maj dans le mdp etc..)
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function ModifProfil() {
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

    const initialValues = {setUserObject};
    useEffect(() =>{
      if (!authState.status) {
          navigate("/login");
      }
  }, []); // crochet car sinon il fonctionnera à l'infini
    const validationSchema = Yup.object().shape({
        surname: Yup.string().min(3).max(20),
        name: Yup.string().min(3).max(20),
        telephone: Yup.number().positive().integer(),
        email: Yup.string().email(),
        password: Yup.string().min(4).max(20),
    });


    const editUser = (option) => {
        if (option.surname !== "") {
          let newSurname = option.surname;
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
        if (option.name !== "") {
          let newName = option.name;
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
        if (option.telephone !== "") {
          let newTelehone = option.telephone;
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
        if (option.email !== "") {
          let newEmail = option.email;
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
          navigate(navigate(-1));
          window.location.reload();
        }
      };
  
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={editUser} validationSchema={validationSchema}> 
            <Form className='formContainer'>
            <h1>Modification</h1>
                <label>Surname: </label>
                <ErrorMessage name="surname" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="surname" 
                /> 
                <label>Name: </label>
                <ErrorMessage name="name" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="name" 
                /> 
                <label>Telephone: </label>
                <ErrorMessage name="telephone" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="telephone" 
                /> 
                <label>Email: </label>
                <ErrorMessage name="email" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="email" 
                /> 
                <button type="submit">Valider la modification</button>
            </Form>
        </Formik>
    </div>
  )
}

export default ModifProfil;