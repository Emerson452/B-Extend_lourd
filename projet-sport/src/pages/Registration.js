import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"; // permet de créer des formulaires sans utiliser les balises html traditionnelles
import * as Yup from "yup"; // validation de formulaire (ex: une maj dans le mdp etc..)
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
    let navigate = useNavigate();

    const initialValues = {
        admin: "false",
        surname: "",
        name: "",
        telephone: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        surname: Yup.string().min(3).max(20).required(),
        name: Yup.string().min(3).max(20).required(),
        telephone: Yup.number().positive().integer(),
        email: Yup.string().email().required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() =>{
            console.log(data);
            navigate("/");
        });
    };
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className='formContainer'>
            <h1>Inscription</h1>
                <label>Surname: </label>
                <ErrorMessage name="surname" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="surname" 
                /> 
                <label>Name: </label>
                <ErrorMessage name="name" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="name" 
                /> 
                <label>Telephone: </label>
                <ErrorMessage name="telephone" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="telephone" 
                /> 
                <label>Email: </label>
                <ErrorMessage name="email" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="email" 
                /> 
                 <label>Password: </label>
                <ErrorMessage name="password" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    type="password"
                    name="password" 
                />
                <button type="submit">Inscription</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration