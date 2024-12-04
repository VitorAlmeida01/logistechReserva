/* 
 Aqui é feita referência do arquivo de model do Endereço, para podermos usar os métodos que acessam o banco de dados
*/
var enderecoModel = require("../models/enderecoModel");


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo login.html (note o nome após o ".body")
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var fkEmpresa = req.body.fkEmpresa;

    console.log(req.body)
 
    // Faça as validações dos valores
    if (cep == undefined || logradouro == undefined || cidade == undefined || uf == undefined || numero == undefined || fkEmpresa == undefined) {
        // Caso algum valor vier como indefinido, devolvo a requisição sem efetuá-la
        res.status(400).send("Alguma informação veio como undefined!")
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        enderecoModel.cadastrar(cep, logradouro, cidade, uf, numero, complemento, fkEmpresa)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de endereços! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}