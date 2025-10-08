const db = require("./db");
const Cliente = require("./Cliente");
const Veiculo = require("./Veiculos");

const Locacao = db.sequelize.define(
    "locacao",
    {
        id_locacao: {
            type: db.Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        data_inicio: {
            type: db.Sequelize.DATE,
            allowNull: false,
        },
        data_fim: {
            type: db.Sequelize.DATE,
            allowNull: true,
        },
        valor: {
            type: db.Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "locacao",

        freezeTableName: true,
    }
);

// --- PARTE MAIS IMPORTANTE PARA CORRIGIR O ERRO ---

// Relação 1: Informa que uma Locação pertence a um Cliente.
// Isso usa a coluna 'fk_cliente' que já existe na sua tabela.
Locacao.belongsTo(Cliente, { foreignKey: "fk_cliente" });

// Relação 2 (Inversa): Informa que um Cliente pode ter várias Locações.
// É esta linha que permite o uso do "include" na consulta de Cliente.
Cliente.hasMany(Locacao, { foreignKey: "fk_cliente" });

// Associações com Veículo (já devem estar aí, mas vamos garantir)
Locacao.belongsTo(Veiculo, { foreignKey: "fk_veiculo" });
Veiculo.hasMany(Locacao, { foreignKey: "fk_veiculo" });

// --- FIM DA PARTE IMPORTANTE ---

module.exports = Locacao;
