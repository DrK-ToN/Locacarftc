const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const rota_turma = require("./routes/rota_turma");
const rota_aluno = require("./routes/rota_aluno");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

//Remanejando Rotas de cargo
app.use("/rota_turma", rota_turma);

//Remanejando Rotas do aluno
app.use("/rota_aluno", rota_aluno);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(
        "Servidor Rodando na em http://localhost:3000/rota_turma/turma\nhttp://localhost:3000/rota_aluno/aluno"
    );
});
