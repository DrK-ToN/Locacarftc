// models/Veiculos.js

const db = require("./db"); //reproduzindo a tabela Veiculo
const Cliente = require("./Cliente"); // Importamos o modelo Cliente

const Veiculo = db.sequelize.define(
    "veiculo",
    {
        id_veiculo: {
            type: db.Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        matricula: {
            // Adicionei matricula que estava na sua rota
            type: db.Sequelize.STRING,
        },
        nome: {
            // 'nome' pode ser o nome/descrição do veículo
            type: db.Sequelize.STRING,
        },
        marca: {
            type: db.Sequelize.STRING,
        },
        ano: {
            type: db.Sequelize.STRING,
        },
        modelo: {
            type: db.Sequelize.STRING,
        },
        placa: {
            type: db.Sequelize.STRING,
            unique: true, // Placa deve ser única
        },
        disponibilidade: {
            type: db.Sequelize.BOOLEAN,
            defaultValue: true, // Por padrão, um veículo novo está disponível
        },
        // A chave estrangeira fk_cliente será criada automaticamente pela associação abaixo
    },
    {
        tableName: "veiculo",

        freezeTableName: true,
    }
);

// Relação: Um Veículo pertence a um Cliente
Veiculo.belongsTo(Cliente, {
    foreignKey: "fk_cliente",
    allowNull: false,
});

// Relação Inversa: Um Cliente pode ter muitos Veículos
Cliente.hasMany(Veiculo, {
    foreignKey: "fk_cliente",
});

module.exports = Veiculo;
