//saisir le jeton envoyé via le front end puis valider en utilisant une fonction vérify 
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken"); //passer le jeton de du front vers le back à travers les headers

    if (!accessToken) return res.json({error: "Utilisateur non connecté !"});

    try {
        const validToken = verify(accessToken, "importantesecret")
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
            return res.json({error: err});
    }
};

module.exports = {validateToken};