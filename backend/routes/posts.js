const { application } = require("express");
const express = require(`express`)// express a un système de routage déjà implémenté
const router = express.Router()
const { posts } = require(`../models`);// destructure de la variable post

router.get("/", async (req, res) => {
    const listOfPosts = await posts.findAll();
    res.json(listOfPosts);
});

//cette route est celle qu'on intéroge by id
router.get("/byId/:id", async (req, res) => {
//création de la route afin d'obtenir l'id
    const id = req.params.id;
    const post = await posts.findByPk(id);//objet contenant le msg spécifique que nous voulons
    res.json(post);
});


router.post("/", async (req, res) => { // faire en sorte que tout soit asynchrone avec sequileze 
    const post = req.body; // body est un objet contenant toutes les données que vous envoyer dans la demande 
    await posts.create(post); // insère des données dans notre bdd
    res.json(post);
});
//ensuite juste besoin de moduler le routeur d'exportation de points pour y avoir accès dans l'index.js
module.exports = router;