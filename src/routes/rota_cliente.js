// routes/rota_cliente.js

const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Rota para listar todos os clientes
router.get("/cliente", (req, res) => {
    Cliente.findAll({ order: [["nome", "ASC"]] }).then((clientes) => {
        res.render("admin/cliente/cliente", {
            clientes: clientes.map((cliente) => cliente.toJSON()),
        });
    });
});

// Rota para abrir o formulário de adição
router.get("/cliente/add", (req, res) => {
    res.render("admin/cliente/addcliente");
});

// Rota para processar o cadastro do novo cliente
router.post("/cliente/novo", (req, res) => {
    Cliente.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        idade: req.body.idade,
        telefone: req.body.telefone,
        email: req.body.email,
    })
        .then(() => {
            res.redirect("/rota_cliente/cliente");
        })
        .catch((erro) => {
            res.send("Houve um erro ao cadastrar o cliente: " + erro);
        });
});

// Rota para abrir o formulário de edição
router.get("/editar_cliente/:id", (req, res) => {
    Cliente.findByPk(req.params.id)
        .then((cliente) => {
            if (cliente) {
                res.render("admin/cliente/editcliente", {
                    cliente: cliente.toJSON(),
                });
            } else {
                res.send("Cliente não encontrado!");
            }
        })
        .catch((err) => {
            res.send("Erro ao buscar cliente: " + err);
        });
});

// Rota para processar a edição do cliente
router.post("/cliente/editar_cliente", (req, res) => {
    Cliente.update(
        {
            nome: req.body.nome,
            cpf: req.body.cpf,
            idade: req.body.idade,
            telefone: req.body.telefone,
            email: req.body.email,
        },
        { where: { id_cliente: req.body.id_cliente } }
    )
        .then(() => {
            res.redirect("/rota_cliente/cliente");
        })
        .catch((erro) => {
            res.send("Erro ao editar cliente: " + erro);
        });
});

// Rota para deletar um cliente
router.get("/deletar_cliente/:id", (req, res) => {
    Cliente.destroy({ where: { id_cliente: req.params.id } })
        .then(() => {
            res.redirect("/rota_cliente/cliente");
        })
        .catch((erro) => {
            res.send("Erro ao deletar cliente: " + erro);
        });
});

module.exports = router;
