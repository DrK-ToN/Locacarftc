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
Locacao.belongsTo(Cliente, { foreignKey: "fk_cliente" });

// Relação 2 (Inversa): Informa que um Cliente pode ter várias Locações.
// ----- ADICIONE A OPÇÃO 'as' AQUI -----
Cliente.hasMany(Locacao, { foreignKey: "fk_cliente", as: "locacoes" });

// Associações com Veículo
Locacao.belongsTo(Veiculo, { foreignKey: "fk_veiculo" });
// Adicione um alias aqui também para consistência (boa prática)
Veiculo.hasMany(Locacao, { foreignKey: "fk_veiculo", as: "locacoes" });

// --- FIM DA PARTE IMPORTANTE ---

module.exports = Locacao;
