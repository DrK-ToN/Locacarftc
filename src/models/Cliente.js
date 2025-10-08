// models/Cliente.js

const db = require("./db"); //reproduzindo a tabela cliente
const Cliente = db.sequelize.define(
    "cliente",
    {
        id_cliente: {
            type: db.Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: db.Sequelize.STRING,
            allowNull: false,
        },
        cpf: {
            type: db.Sequelize.STRING,
            unique: true, // CPF deve ser único
        },
        idade: {
            type: db.Sequelize.INTEGER,
        },
        telefone: {
            type: db.Sequelize.STRING,
        },
        email: {
            type: db.Sequelize.STRING,
        },
    },
    {
        // Sequelize por padrão pluraliza os nomes da tabela.
        // freezeTableName: true faz com que o nome da tabela seja exatamente 'cliente'

        tableName: "cliente",

        freezeTableName: true,
    }
);
module.exports = Cliente;
