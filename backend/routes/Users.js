const { application } = require("express");
const express = require(`express`)// express a un système de routage déjà implémenté
const router = express.Router()
const { Users } = require(`../models`);// destructure de la variable post
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken'); //création de token
const { validateToken } = require('../middewares/AuthMiddleware');


//REGISTER
//Demande Post qui va insérer des éléments dans notre table users (registration)
router.post("/", async (req, res) => {
    const { admin, surname, name, telephone, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            admin: admin,
            surname: surname,
            name: name,
            telephone: telephone,
            email: email,
            password: hash,
        });
        res.json("SUCCES");
    });
});

//LOGIN 
router.post('/login', async (req, res) => {
    const {admin, surname, name, telephone, email, password} = req.body;
    //vérification si il éxiste dans la table
    const user = await Users.findOne({ where: {email: email}});

    if (!user) res.json({error: "L'utilisateur n'éxiste pas !"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Mauvais mot de passe ou nom d'utilisateur !"})

        //Génération du token
        const accessToken = sign({email: user.email, id: user.id}, "importantesecret");
        res.json(accessToken);
    })
});

//verif si il y un token valide ou non
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

//ensuite juste besoin de moduler le routeur d'exportation de points pour y avoir accès dans l'index.js
module.exports = router;