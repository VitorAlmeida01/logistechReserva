var express = require("express");
var router = express.Router();

// Aqui criamos uma referência à Controller de empresa (já que usamos um método que está nesse arquivo)
var empresaController = require("../controllers/empresaController");

//Aqui eu defino que minha rota /cadastrar receberá uma requisição do tipo "POST", que receberá 2 argumentos (req, res) 
// e que redirecionará esses argumentos para a função "cadastrar" da página empresaController
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/listar/:id", function (req, res) {
    empresaController.listarPorId(req, res);
})

router.get("/listarInativas", (req, res) => {
    empresaController.listarInativas(req, res)
})

router.patch("/aprovar/:idEmpresa", (req, res) => {
    empresaController.aprovarEmpresa(req, res)
})

router.delete("/reprovar/:idEmpresa", (req, res) => {
    empresaController.reprovarEmpresa(req, res)
})


module.exports = router;