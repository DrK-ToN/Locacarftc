// routes/rota_veiculos.js

const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");
const Veiculo = require("../models/Veiculos");

// Rota para listar todos os veículos
// Em routes/rota_veiculos.js, substitua o router.get("/veiculo", ...) por este:
const { Op } = require("sequelize"); // Importar o Op para filtros complexos

router.get("/veiculos", (req, res) => {
    const whereClause = {};
    const { marca, modelo, disponibilidade } = req.query;

    if (marca) {
        whereClause.marca = { [Op.like]: `%${marca}%` };
    }
    if (modelo) {
        whereClause.modelo = { [Op.like]: `%${modelo}%` };
    }
    if (disponibilidade) {
        whereClause.disponibilidade = disponibilidade === "true";
    }

    Veiculo.findAll({
        where: whereClause,
        include: [{ model: Cliente, as: "cliente" }],
        order: [["nome", "ASC"]],
    })
        .then((veiculos) => {
            res.render("admin/veiculos/veiculos", {
                veiculos: veiculos.map((v) => v.toJSON()),
                // Enviando os valores da busca de volta para preencher o formulário
                query: req.query,
            });
        })
        .catch((err) => {
            res.send("Erro ao carregar veículos: " + err);
        });
});

// Rota para abrir o formulário de adição de veículo
router.get("/veiculos/add", (req, res) => {
    Cliente.findAll().then((clientes) => {
        res.render("admin/veiculos/addveiculos", {
            clientes: clientes.map((c) => c.toJSON()),
        });
    });
});

// Rota para cadastrar um novo veículo
router.post("/veiculos/novo", (req, res) => {
    Veiculo.create({
        matricula: req.body.matricula,
        nome: req.body.nome,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        placa: req.body.placa,
        disponibilidade: req.body.disponibilidade,
        fk_cliente: req.body.fk_cliente, // Chave estrangeira
    })
        .then(() => {
            res.redirect("/rota_veiculos/veiculos");
        })
        .catch((erro) => {
            res.send("Houve um erro ao cadastrar o veículo: " + erro);
        });
});

// Rota para abrir o formulário de edição
router.get("/editar_veiculos/:id", (req, res) => {
    Veiculo.findByPk(req.params.id)
        .then((veiculo) => {
            if (veiculo) {
                Cliente.findAll().then((clientes) => {
                    res.render("admin/veiculos/editveiculos", {
                        veiculo: veiculo.toJSON(),
                        clientes: clientes.map((c) => c.toJSON()),
                    });
                });
            } else {
                res.send("Veículo não encontrado!");
            }
        })
        .catch((err) => {
            res.send("Erro ao carregar dados para edição: " + err);
        });
});

// Rota para processar a edição do veículo
router.post("/veiculos/editar_veiculos", (req, res) => {
    Veiculo.update(
        {
            matricula: req.body.matricula,
            nome: req.body.nome,
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano,
            placa: req.body.placa,
            disponibilidade: req.body.disponibilidade,
            fk_cliente: req.body.fk_cliente,
        },
        { where: { id_veiculo: req.body.id_veiculo } }
    )
        .then(() => {
            res.redirect("/rota_veiculos/veiculos");
        })
        .catch((erro) => {
            res.send("Erro ao editar o veículo: " + erro);
        });
});

// Rota para deletar um veículo
router.get("/deletar_veiculos/:id", (req, res) => {
    Veiculo.destroy({ where: { id_veiculo: req.params.id } })
        .then(() => {
            res.redirect("/rota_veiculos/veiculos");
        })
        .catch((err) => {
            res.send("Erro ao deletar o veículo: " + err);
        });
});

module.exports = router;
