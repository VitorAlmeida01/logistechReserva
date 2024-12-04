var express = require("express");
var router = express.Router();

// Aqui criamos uma referência à Controller de Esteira (já que usamos um método que está nesse arquivo)
var esteiraController = require("../controllers/esteiraController");

//Aqui eu defino que minha rota /cadastrar receberá uma requisição do tipo "POST", que receberá 2 argumentos (req, res) 
// e que redirecionará esses argumentos para a função "cadastrar" da página esteiraController
router.post("/cadastrar", function (req, res) {
    esteiraController.cadastrar(req, res);
})

router.get("/listar/:fkEmpresa", function (req, res) {
    esteiraController.listarTodasEsteiras(req, res);
})

router.delete("/deletar/:idEsteira", function (req, res) {
    esteiraController.deletarEsteira(req, res);
})

router.put('/editar/:idEsteira', function (req, res){
    esteiraController.editarEsteira(req, res)
})

router.get('/listarInvalidosPorEsteira/:idEmpresa', function (req, res){
    esteiraController.listarInvalidosPorEsteira(req, res)
})

router.get('/listarValidosPorEsteira/:idEmpresa', function (req, res){
    esteiraController.listarValidosPorEsteira(req, res)
})

router.get("/pesquisarEsteira/:idEmpresa/:nome", function(req, res) {
    esteiraController.pesquisarEsteira(req, res);
});

router.get("/filtrarEsteira/:idEsteira", function(req, res) {
    esteiraController.filtrarEsteira(req, res);
});


module.exports = router;