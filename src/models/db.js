const Sequelize = require("sequelize"); //Conexão com o banco de dados
const sequelize = new Sequelize("Locacarftc", "useradmin", "admin@123", {
    host: "server-bd-cn1.mysql.database.azure.com",
    port: "3306",
    dialect: "mysql",
});

//exportando as variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
};
