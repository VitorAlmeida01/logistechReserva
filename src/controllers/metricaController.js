/* 
 Aqui é feita referência do arquivo de model da empresa, para podermos usar os métodos que acessam o banco de dados
*/
var metricaModel = require("../models/metricaModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo login.html (note o nome após o ".body")
    var nome = req.body.nome;
    var valorMinimo = req.body.valorMinimo;
    var valorMaximo = req.body.valorMaximo;
    var cor = req.body.cor;
    var fkEsteira = req.body.fkEsteira;

    // Faça as validações dos valores
    if (nome == undefined || valorMinimo == undefined || valorMaximo == undefined || fkEsteira == undefined || cor == undefined) {
        // Caso algum valor vier como indefinido, devolvo a requisição sem efetuá-la
        res.status(400).send("Alguma informação veio como undefined!");
        return
    }

    if (valorMinimo >= valorMaximo) {
        res.status(400).send("O valor mínimo deve ser menor que o valor máximo!");
        return;
    }


       // Verificar conflitos de intervalo
    metricaModel.verificarConflito(valorMinimo, valorMaximo, fkEsteira)
    .then(function (resultados) {
        if (resultados.length > 0) {
            // Há conflito
            console.log("estou aqui")
            res.status(400).json({ mensagem: "O intervalo fornecido conflita com uma métrica já existente!" });
        } else {
            // Sem conflito, cadastrar métrica
            metricaModel.cadastrar(nome, valorMinimo, valorMaximo, cor, fkEsteira)
                .then(function (resultado) {
                    res.status(200).json(resultado);
                })
                .catch(function (erro) {
                    console.error("Erro ao cadastrar métrica:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
        }
    })
}

function atualizar(req, res) {
    var nome = req.body.nome;
    var valorMinimo = req.body.valorMinimo;
    var valorMaximo = req.body.valorMaximo;
    var cor = req.body.cor;
    var idMetrica = req.body.idMetrica;
    var fkEsteira = req.body.fkEsteira;

    if (nome == undefined || valorMinimo == undefined || valorMaximo == undefined || cor == undefined || idMetrica == undefined) {
        res.status(400).send("Algum parametro indefinido");
    }

    
    if (valorMinimo >= valorMaximo) {
        res.status(400).send("O valor mínimo deve ser menor que o valor máximo!");
    }
  // Verificar conflito no banco de dados
  metricaModel.verificarConflito(valorMinimo, valorMaximo, fkEsteira)
  .then(function (resultados) {
      // Verificar se há algum conflito além da própria métrica sendo atualizada
      const conflito = resultados.some((metrica) => metrica.idMetrica != idMetrica);

      if (conflito) {
          res.status(400).json({message: "O intervalo fornecido conflita com outra métrica já existente!"});
          return;
      }

      // Atualizar a métrica se não houver conflitos
      metricaModel.atualizar(nome, valorMaximo, valorMinimo, cor, idMetrica)
          .then(function (resultado) {
              res.status(200).json(resultado);
          })
          .catch(function (erro) {
              console.error("Erro ao atualizar métrica:", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          });
  })
  .catch(function (erro) {
      console.error("Erro ao verificar conflito:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });

    
}

function listarMetricasPorId(req, res) {
    var idMetrica = req.params.idMetrica;

    if (idMetrica == undefined) {
        res.status(400).send("ID da métrica indefinido");
    } else {
        metricaModel.listarMetricasPorId(idMetrica)
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

function listarMetricasPorEsteira(req, res) {
    var fkEsteira = req.params.fkEsteira;

    if (fkEsteira == undefined) {
        res.status(400).send("ID da esteira indefinido");
    } else {
        metricaModel.listarMetricasPorEsteira(fkEsteira)
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

function listarMetricaParaPorcentagem(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idEsteira = req.params.idEsteira;
    var porcentagem = req.params.porcentagem;

    if (fkEmpresa == undefined) {
        res.status(400).send("ID da esteira indefinido");
    } else {
        metricaModel.listarMetricaParaPorcentagem(fkEmpresa, idEsteira, porcentagem)
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

function deletar(req, res) {
    var idMetrica = req.params.idMetrica;

    if (idMetrica == undefined) {
        res.status(400).send("ID da métrica indefinido");
    } else {
        metricaModel.deletarMetrica(idMetrica)
            .then(
                function (resultado) {
                    res.status(200).json(resultado);
                }
            )
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao deletar a métrica! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
    }
}

module.exports = {
    cadastrar,
    listarMetricasPorEsteira,
    deletar,
    listarMetricasPorId,
    atualizar,
    listarMetricaParaPorcentagem
}