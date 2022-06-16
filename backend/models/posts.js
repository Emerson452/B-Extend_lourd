
module.exports = (sequelize, DataTypes) => {

    // variable pour représenter notre modèle
    const posts = sequelize.define("posts", {
        //définir les types
        title:{
            type: DataTypes.STRING, // chaîne de charactère 
            allowNull: false, //titre obligatoir 
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock:{
            type: DataTypes.SMALLINT,
            allowNull: false, 
        },
        price:{
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    })

    //renvoyer cet objet
    return posts;
}