/* 
 Aqui é feita referência do arquivo de model da empresa, para podermos usar os métodos que acessam o banco de dados
*/
var esteiraModel = require("../models/esteiraModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo login.html (note o nome após o ".body")
    var nome = req.body.nome
    var departamento = req.body.departamento;
    var localizacao = req.body.localizacao;
    var distanciaEsperada = req.body.distanciaEsperada;
    var fkEmpresa = req.body.fkEmpresa;

    // Faça as validações dos valores
    if (nome == undefined ||departamento == undefined || localizacao == undefined || distanciaEsperada == undefined || fkEmpresa == undefined) {
        // Caso algum valor vier como indefinido, devolvo a requisição sem efetuá-la
        res.status(400).send("Alguma informação veio como undefined!")
    }
    else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        esteiraModel.cadastrar(nome, departamento, localizacao, distanciaEsperada, fkEmpresa)
            .then(
                function (resultado) {
                    console.log("RESULTADO: ", resultado)
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro de esteira! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarTodasEsteiras(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da empresa indefinido");
     } else {
        esteiraModel.listarTodasEsteiras(fkEmpresa)
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

function deletarEsteira(req, res) {
    var idEsteira = req.params.idEsteira;

    if (idEsteira == undefined) {
        res.status(400).send("ID da esteira indefinido");
    } else {
        esteiraModel.deletarEsteira(idEsteira)
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

function editarEsteira(req, res){
    var idEsteira = req.params.idEsteira
    var nome = req.body.nome
    var departamento = req.body.departamento
    var localizacao = req.body.localizacao
    var distanciaEsperada = req.body.distanciaEsperada

    if(idEsteira === undefined){
        res.status(400).send("ID da esteira indefinido");
    }else{
        esteiraModel.editarEsteira(idEsteira, nome, departamento, localizacao, distanciaEsperada)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao atualizar a esteira! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function listarValidosPorEsteira(req, res){
    var idEmpresa = req.params.idEmpresa

    if(idEmpresa === undefined){
        res.status(400).send("ID da esteira indefinido");
    }else{
        esteiraModel.listarValidosPorEsteira(idEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar os produtos da esteira! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function listarInvalidosPorEsteira(req, res){
    var idEmpresa = req.params.idEmpresa

    if(idEmpresa === undefined){
        res.status(400).send("ID da esteira indefinido");
    }else{
        esteiraModel.listarInvalidosPorEsteira(idEmpresa)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao listar os produtos da esteira! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }
}


function pesquisarEsteira(req, res){
    var idEmpresa = req.params.idEmpresa
    var nome = req.params.nome

    if (idEmpresa == undefined) {
      res.status(400).send("ID da empresa indefinido");
   } else {
      esteiraModel.pesquisarEsteira(idEmpresa, nome)
      .then(
          function (resultado) {
              res.status(200).json(resultado);
          }
      )
      .catch(function (erro) {
          console.log(erro);
          console.log(
              "\nHouve um erro ao realizar a filtragem de esteira Erro: ",
              erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
      })
   }
  }
  
  function filtrarEsteira(req, res){
    var idEsteira = req.params.idEsteira

    if (idEsteira == undefined) {
      res.status(400).send("ID da empresa indefinido");
   } else {
      esteiraModel.filtrarEsteira(idEsteira)
      .then(
          function (resultado) {
              res.status(200).json(resultado);
          }
      )
      .catch(function (erro) {
          console.log(erro);
          console.log(
              "\nHouve um erro ao realizar a filtragem de esteira Erro: ",
              erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
      })
   }
  }

module.exports = {
    cadastrar,
    listarTodasEsteiras,
    deletarEsteira,
    editarEsteira,
    listarValidosPorEsteira,
    listarInvalidosPorEsteira,
    pesquisarEsteira,
    filtrarEsteira
}