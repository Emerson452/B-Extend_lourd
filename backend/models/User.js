
module.exports = (sequelize, DataTypes) => {

    // variable pour représenter notre modèle
    const Users = sequelize.define("Users", {
        //définir les types
        admin:{
            type: DataTypes.BOOLEAN, // chaîne de charactère 
            defaultValue: false,
        },
        surname:{
            type: DataTypes.STRING, // chaîne de charactère 
            allowNull: false, //titre obligatoir 
        },
        name:{
            type: DataTypes.STRING, // chaîne de charactère 
            allowNull: false, //titre obligatoir 
        },
        telephone:{
            type: DataTypes.BIGINT, // chaîne de charactère 
        },
        email:{
            type: DataTypes.STRING, // chaîne de charactère 
            allowNull: false, //titre obligatoir 
        },
        password:{
            type: DataTypes.STRING, // chaîne de charactère 
            allowNull: false, //titre obligatoir 
        },
    });

    //renvoyer cet objet
    return Users;
};