const { application } = require("express");
const express = require(`express`)// express a un système de routage déjà implémenté
const router = express.Router()
const { Users } = require(`../models`);// destructure de la variable post
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken'); //création de token
const { validateToken } = require('../middewares/AuthMiddleware');

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});
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
        res.json(req.body);
    });
});

//LOGIN 
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body)
    //vérification si il éxiste dans la table
    const user = await Users.findOne({ where: {email: email}});

    if (!user) res.json({error: "L'utilisateur n'éxiste pas !"});

    bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) res.json({ error: "Mauvais mot de passe ou nom d'utilisateur !"});
        //Génération du token
        const accessToken = sign(
            {surname: user.surname, name: user.name, telephone:user.telephone, email: email, id: user.id, admin: user.admin}, 
            "importantesecret"
    );
    res.json({token: accessToken, surname: user.surname, name: user.name, telephone:user.telephone, email: email, id: user.id, admin: user.admin});
});
});

router.get("/byId/:id", async (req, res) => {
    //création de la route afin d'obtenir l'id
        const id = req.body.id;
        const user = await Users.findByPk(id);//objet contenant le msg spécifique que nous voulons
        res.json(user);
    });

    router.get("/byId/:id", async (req, res) => {
        //création de la route afin d'obtenir l'id
            const id = req.body.id;
            const post = await Users.findByPk(id);//objet contenant le msg spécifique que nous voulons
            res.json(post);
        });

//verif si il y un token valide ou non
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

//get req pour les info de l'utilisateur
router.get("/information/:id", async (req, res) => { //grab l'id en tant que params / async car nous devons attendre certaines données 
    const id = req.params.id

    const information = await Users.findByPk(id); // passer une sorte d'attributs pour ne pas prendre le mdp
    res.json(information);
});

router.put("/surname", async (req, res) => {
    const { newSurname, id } = req.body;
    await Users.update({ surname: newSurname }, { where: { id: id } });
    res.json(newSurname);
  });
  
  router.put("/name", async (req, res) => {
    const { newName, id } = req.body;
    await Users.update({ name: newName }, { where: { id: id } });
    res.json(newName);
  });
  
  router.put("/telephone", async (req, res) => {
    const { newTelehone, id } = req.body;
    await Users.update({ telephone: newTelehone }, { where: { id: id } });
    res.json(newTelehone);
  });
  
  router.put("/email", async (req, res) => {
    const { newEmail, id } = req.body;
    await Users.update({ email: newEmail }, { where: { id: id } });
    res.json(newEmail);
});

router.delete("/:authId", async (req, res) => {
    const authId = req.params.authId

    await Users.destroy({
        where: {
            id: authId
        },
    });
    res.json("Suppression du post")
});
// router.put("/changepassword", validateToken, async (req, res) => {
//     const { oldPassword, newPassword } = req.body;
//     const user = await Users.findOne({ where: { username: req.user.username } });
  
//     bcrypt.compare(oldPassword, user.password).then(async (match) => {
//       if (!match) res.json({ error: "Wrong Password Entered!" });
  
//       bcrypt.hash(newPassword, 10).then((hash) => {
//         Users.update(
//           { password: hash },
//           { where: { username: req.user.username } }
//         );
//         res.json("SUCCESS");
//       });
//     });
//   });

//ensuite juste besoin de moduler le routeur d'exportation de points pour y avoir accès dans l'index.js
module.exports = router;