// routes/rota_locacao.js
const express = require("express");
const router = express.Router();
const Locacao = require("../models/Locacao");
const Cliente = require("../models/Cliente");
const Veiculo = require("../models/Veiculos");
const { Op } = require("sequelize"); // Para fazer a busca de veículos disponíveis

// ROTA 1: Abre o formulário para adicionar uma nova locação
router.get("/locacao/add", (req, res) => {
    // Vamos buscar os clientes e apenas os veículos disponíveis para popular os menus
    Promise.all([
        Cliente.findAll({ order: [["nome", "ASC"]] }),
        Veiculo.findAll({
            where: { disponibilidade: true },
            order: [["nome", "ASC"]],
        }),
    ])
        .then(([clientes, veiculos]) => {
            res.render("admin/locacao/addlocacao", {
                clientes: clientes.map((c) => c.toJSON()),
                veiculos: veiculos.map((v) => v.toJSON()),
            });
        })
        .catch((err) => {
            res.send("Erro ao carregar o formulário: " + err);
        });
});

// ROTA 2: Recebe os dados do formulário e cria a nova locação
router.post("/locacao/novo", (req, res) => {
    Locacao.create({
        // ... seus dados da locação
    })
        .then((locacao) => {
            return Veiculo.update(
                { disponibilidade: false },
                { where: { id_veiculo: req.body.fk_veiculo } }
            ).then(() => {
                // --- ADICIONE ESTA LINHA ---
                req.flash("success_msg", "Locação registrada com sucesso!");
                // --- FIM DA LINHA ADICIONADA ---
                res.redirect("/rota_locacao/historico/" + locacao.fk_cliente);
            });
        })
        .catch((err) => {
            // Você também pode criar uma mensagem de erro!
            req.flash(
                "error_msg",
                "Houve um erro ao registrar a locação. Tente novamente."
            );
            res.redirect("/rota_locacao/locacao/add"); // Redireciona de volta para o formulário
        });
});

// ROTA 3: Exibe o histórico de locações de um cliente específico
router.get("/historico/:id_cliente", (req, res) => {
    Cliente.findByPk(req.params.id_cliente, {
        include: [
            {
                model: Locacao,
                include: [Veiculo],
            },
        ],
        // ----- ALTERAÇÃO AQUI: Comente ou remova a linha abaixo -----
        // order: [[Locacao, "data_inicio", "DESC"]],
    })
        .then((cliente) => {
            if (!cliente) {
                return res.send("Cliente não encontrado");
            }

            console.log(
                "SAÍDA DO BANCO DE DADOS:", // Mudei o texto para ficar mais fácil de achar
                JSON.stringify(cliente, null, 2)
            );

            res.render("admin/cliente/historico", {
                cliente: cliente,
            });
        })
        .catch((err) => {
            console.log("Erro ao carregar histórico:", err);
            res.send("Erro ao carregar histórico: " + err);
        });
});

module.exports = router;
