const { application } = require("express");
const express = require(`express`)// express a un système de routage déjà implémenté
const router = express.Router()
const { posts } = require(`../models`);// destructure de la variable post
const { validateToken } = require ('../middewares/AuthMiddleware');

router.get("/", async (req, res) => {
    const listOfPosts = await posts.findAll();
    res.json(listOfPosts);
});

//, validateToken mettre une cond 
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

router.put("/title", async (req, res) => {
    const { newTitle, id } = req.body;
    await posts.update({ title: newTitle }, { where: { id: id } });
    res.json(newTitle);
  });

router.put("/description", async (req, res) => {
    const { newDescription, id } = req.body;
    await posts.update({ description: newDescription }, { where: { id: id } });
    res.json(newDescription);
  });

router.put("/price", async (req, res) => {
    const { newPrice, id } = req.body;
    await posts.update({ price: newPrice }, { where: { id: id } });
    res.json(newPrice);
  });

router.put("/stock", async (req, res) => {
    const { newStock, id } = req.body;
    await posts.update({ stock: newStock }, { where: { id: id } });
    res.json(newStock);
  });

router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId

    await posts.destroy({
        where: {
            id: postId
        },
    });
    res.json("Suppression du post")
});

//ensuite juste besoin de moduler le routeur d'exportation de points pour y avoir accès dans l'index.js
module.exports = router;