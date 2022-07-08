const express = require(`express`) // instance
const app = express()
const cors = require(`cors`)

app.use(express.json());
app.use(cors());// il mettra automatiquement l'api sur list blanche pour que la connexion fonctionne
//table pour la bdd : passe en revue chaque table du dossier models
const db = require(`./models`)

//Routeurs
const postRouter = require("./routes/posts")
app.use("/posts", postRouter);

const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter);

const panierRouter = require("./routes/panier")
app.use("/panier", usersRouter);


//lorsque nous démarrons note api = parcourir les tables unique dans le dos modèles et verif si ils éxistent dans la bdd
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Serveur running on port 3001") // confirmation que le serveur est good
    });
});