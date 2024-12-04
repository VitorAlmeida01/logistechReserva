var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/listar/:fkEmpresa", function (req, res) {
    alertaController.listarTodosAlertas(req, res);
})

router.get("/listarNaoVistos/:fkEmpresa", (req, res) => {
    alertaController.listarAlertasNaoVistos(req, res);
})

router.put("/atualizar", function (req, res) {
    alertaController.atualizarVisto(req, res);
})

router.post("/listarPorData/:fkEmpresa", (req, res) => {
    alertaController.listarPorData(req, res);
})

router.post("/listarNaoVistoPorData/:fkEmpresa", (req, res) => {
    alertaController.listarAlertasNaoVistosPorData(req, res)
})

module.exports = router;