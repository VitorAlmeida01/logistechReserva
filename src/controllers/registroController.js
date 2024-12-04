var registroModel = require("../models/registroModel");

function listarTodosRegistros(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarTodosRegistros(fkEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }


}

function listarRegistrosPorData(req, res) {
var fkEmpresa = req.params.fkEmpresa;
var dataInicial = req.body.dataInicial;
var dataFinal = req.body.dataFinal;

    if (dataFinal == undefined || dataInicial == undefined) {
        res.status(400).send("Datas indefinidos");
     } else {
        registroModel.listarRegistrosPorData(dataInicial, dataFinal, fkEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }
}

function listarProdutosValidosInvalidosTotalEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarProdutosValidosInvalidosTotalEmpresa(fkEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }


}
function listarProdutosValidosInvalidosPorSemanaEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarProdutosValidosInvalidosPorSemanaEmpresa(fkEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }


}

function listarValidosInvalidosTodasEsteirasEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarValidosInvalidosTodasEsteirasEmpresa(fkEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }
}
function listarProdutosValidosInvalidosTotalEsteiraEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idEsteira = req.params.idEsteira;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarProdutosValidosInvalidosTotalEsteiraEmpresa(fkEmpresa, idEsteira)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }
}
function listarProdutosValidosInvalidosPorSemanaEsteiraEmpresa(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idEsteira = req.params.idEsteira;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarProdutosValidosInvalidosPorSemanaEsteiraEmpresa(fkEmpresa, idEsteira)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }
}
function listarProdutosValidosInvalidosTempoReal(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idEsteira = req.params.idEsteira;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        registroModel.listarProdutosValidosInvalidosTempoReal(fkEmpresa, idEsteira)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar esteiras! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }
}
module.exports = {
    listarTodosRegistros,
    listarRegistrosPorData,
    listarProdutosValidosInvalidosTotalEmpresa,
    listarProdutosValidosInvalidosPorSemanaEmpresa,
    listarValidosInvalidosTodasEsteirasEmpresa,
    listarProdutosValidosInvalidosTotalEsteiraEmpresa,
    listarProdutosValidosInvalidosPorSemanaEsteiraEmpresa,
    listarProdutosValidosInvalidosTempoReal
}