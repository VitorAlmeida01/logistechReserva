/* 
 Aqui é feita referência do arquivo de model da empresa, para podermos usar os métodos que acessam o banco de dados
*/
var empresaModel = require("../models/empresaModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo login.html (note o nome após o ".body")
    var razaoSocial = req.body.razaoSocial;
    var cnpj = req.body.cnpj;
    var telefone = req.body.telefone;
 
    // Faça as validações dos valores
    if (razaoSocial == undefined || cnpj == undefined || telefone == undefined ) {
        // Caso algum valor vier como indefinido, devolvo a requisição sem efetuá-la
        res.status(400).send("Alguma informação veio como undefined!")
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.cadastrar(razaoSocial, cnpj, telefone)
            .then(
                function (resultado) {
                    console.log("RESULTADO: ", resultado)
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarPorId(req, res) {
    // Recebendo parametro da URL 
    var idEmpresa = req.params.id;

    if (idEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        empresaModel.listarPorId(idEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro de empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }


}

function listarInativas(req, res) {
    empresaModel.listarInativas()
    .then(resultado => {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a listagem de empresa inativa! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}

function aprovarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa indefinido")
    }

    empresaModel.aprovarEmpresa(idEmpresa)
    .then(resultado => {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a listagem de empresa inativa! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}

function reprovarEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("Id da empresa indefinido")
    }

    empresaModel.reprovarEmpresa(idEmpresa)
    .then(resultado => {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a listagem de empresa inativa! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar,
    listarPorId,
    listarInativas,
    aprovarEmpresa,
    reprovarEmpresa
}