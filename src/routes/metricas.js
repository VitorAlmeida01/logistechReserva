var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

router.post("/cadastrar", function (req, res) {
    metricaController.cadastrar(req, res);
})

router.get("/listar/esteira/:fkEsteira", function (req, res) {
    metricaController.listarMetricasPorEsteira(req, res);
})

router.get("/listar/metrica/:idMetrica", (req, res) => {
    metricaController.listarMetricasPorId(req, res);
})
router.get("/listarMetricaParaPorcentagem/:fkEmpresa/:idEsteira/:porcentagem", (req, res) => {
    metricaController.listarMetricaParaPorcentagem(req, res);
})

router.put("/atualizar", (req, res) => {
    metricaController.atualizar(req, res);
})

router.delete("/deletarMetrica/:idMetrica", function (req, res) {
    metricaController.deletar(req, res);
})

module.exports = router;