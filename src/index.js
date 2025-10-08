const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars"); // ✅ Mantenha apenas esta importação
const bodyParser = require("body-parser");
const rota_cliente = require("./routes/rota_cliente");
const rota_veiculos = require("./routes/rota_veiculos");
const rota_locacao = require("./routes/rota_locacao");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

app.use(
    session({
        secret: "suaChaveSecretaDeSessao", // Troque por qualquer texto secreto
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());

// Middleware global para passar as mensagens para todas as views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Configuração do Handlebars com o helper 'eq'
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
        eq: function (a, b) {
            return a === b;
        },
    },
});

// ✅ Diz ao Express para USAR o Handlebars com a configuração que você criou
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views")); // Boa prática para definir o caminho das views

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
    res.render("home");
});

// Remanejando Rotas
app.use("/rota_cliente", rota_cliente);
app.use("/rota_veiculos", rota_veiculos);
app.use("/rota_locacao", rota_locacao);

// No seu arquivo index.js

const db = require("./models/db"); // Importe sua configuração do banco de dados

// ... outras importações e configurações do app

// Remanejando Rotas
app.use("/rota_cliente", rota_cliente);
app.use("/rota_veiculos", rota_veiculos);
app.use("/rota_locacao", rota_locacao);

// --- CÓDIGO DE SINCRONIZAÇÃO A SER ADICIONADO AQUI ---
db.sequelize
    .sync()
    .then(() => {
        console.log("Modelos sincronizados com o banco de dados.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar modelos:", error);
    });
// --- FIM DO CÓDIGO DE SINCRONIZAÇÃO ---

const PORT = process.env.PORT || 3000; // Usa a porta do Azure ou 3000 se não existir
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
