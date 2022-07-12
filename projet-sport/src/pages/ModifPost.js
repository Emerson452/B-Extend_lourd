import '../styles/Createpost.css';
import React, { useContext, useEffect, useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik"; // permet de créer des formulaires sans utiliser les balises html traditionnelles
import * as Yup from "yup"; // validation de formulaire (ex: une maj dans le mdp etc..)
import axios from "axios"; //req  get request in createpost
import { useNavigate, useParams } from 'react-router-dom'; // hook d'history
import { AuthContext } from "../helpers/AuthContext";


function ModifPost() {
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(() => { //récupérer les données basées sur cet identifiant = useEffect hook
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {//ce que nous faisons après avoir reçu les données
          //comment afficher les données
          setPostObject(response.data);
          console.log(setPostObject);
        },
      );
  }, []);

    const initialValues = {setPostObject};

    useEffect(() =>{
        if (!authState.status) {
            navigate("/login");
        }
    }, []); // crochet car sinon il fonctionnera à l'infini
    const validationSchema = Yup.object().shape({
        title: Yup.string(),
        description: Yup.string(),
        stock: Yup.number().positive().integer(),
        price: Yup.number().positive().integer(),
    });


    const editPost = (option) => {
        console.log(option);
        if (option.title !== "") {
          let newTitle = option.title;
          if (newTitle) {
            axios.put(
              "http://localhost:3001/posts/title",
              {
                newTitle: newTitle,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setPostObject({ ...postObject, title: newTitle });
          }
        }
        if (option.description !== "") {
          let newDescription = option.description;
          if (newDescription) {
            axios.put(
              "http://localhost:3001/posts/description",
              {
                newDescription: newDescription,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setPostObject({ ...postObject, description: newDescription });
          }
        }
        if (option.price !== "") {
          let newPrice = option.price;
          if (newPrice) {
            axios.put(
              "http://localhost:3001/posts/price",
              {
                newPrice: newPrice,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setPostObject({ ...postObject, price: newPrice });
          }
        }
        if (option.stock !== "") {
          let newStock = option.stock;
          if (newStock) {
            axios.put(
              "http://localhost:3001/posts/stock",
              {
                newStock: newStock,
                id: id,
              },
              {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
              }
            );
    
            setPostObject({ ...postObject, stock: newStock });
          }
          navigate(navigate(-1));
          window.location.reload();
        }
      };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={editPost} validationSchema={validationSchema}> 
            <Form className='formContainer'>
            <h1>Créer une location</h1>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Ballon...)"
                /> 
                <label>Description: </label>
                <ErrorMessage name="description" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="description" 
                    placeholder="(Ex. Taille...)"
                /> 
                {/* <input type="file" name='image'></input>
                <input type="submit" name='valider' value="changer"/> */}
                <label>Stock: </label>
                <ErrorMessage name="stock" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="stock" 
                    placeholder="(Ex. 3...)"
                /> 
                <label>Price: </label>
                <ErrorMessage name="price" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="price" 
                    placeholder="(Ex. 25...)"
                /> 
                <button type="submit">Valider la modification.</button>
            </Form>
        </Formik>
    </div>
  )
}

export default ModifPost;