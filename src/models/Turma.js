const db = require("./db");
//reproduzindo a tabela Turma
const Turma = db.sequelize.define(
    "turma",
    {
        id_turma: {
            type: db.Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        descricao: {
            type: db.Sequelize.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
);//freezeTableName: true define o nome da tabela sem o S

module.exports = Turma;
