var alertaModel = require("../models/alertaModel");

function listarTodosAlertas(req, res) {
  var fkEmpresa = req.params.fkEmpresa;

  if (fkEmpresa == undefined) {
    res.status(400).send("ID da empresa indefinido");
  } else {
    alertaModel.listarTodosAlertas(fkEmpresa)
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

function listarPorData(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  var dataInicial = req.body.dataInicial;
  var dataFinal = req.body.dataFinal;

  if (fkEmpresa == undefined) {
    res.status(400).send("ID da empresa indefinido");
  } else {
    alertaModel.listarAlertasPorData(dataInicial, dataFinal,fkEmpresa)
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

function atualizarVisto(req, res) {
  var idAlerta = req.body.idAlerta;
  var visto = req.body.visto;
  var fkRegistro = req.body.fkRegistro;

  if (idAlerta === undefined) {
    return res.status(400).send("ID do alerta indefinido");
  } else if (visto === undefined) {
    return res.status(400).send("Valor do campo 'visto' indefinido");
  } else if (fkRegistro === undefined) {
    return res.status(400).send("Valor do campo 'fkRegistro' indefinido");
  } else {
    alertaModel
      .atualizarVisto(idAlerta, visto, fkRegistro)
      .then((resultado) => {
        res.status(200).send("Visto atualizado com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
        console.log("\nHouve um erro ao atualizar o campo 'visto'! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarAlertasNaoVistos(req, res) {
  var fkEmpresa = req.params.fkEmpresa;

  if (fkEmpresa == undefined) {
    res.status(400).send("ID da empresa indefinido");
  } else {
    alertaModel.listarAlertasNaoVistos(fkEmpresa)
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

function listarAlertasNaoVistosPorData(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  var dataInicial = req.body.dataInicial;
  var dataFinal = req.body.dataFinal;

  if (fkEmpresa == undefined) {
    res.status(400).send("ID da empresa indefinido");
  } else {
    alertaModel.listarAlertasNaoVistosPorData(dataInicial, dataFinal,fkEmpresa)
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
  listarTodosAlertas,
  atualizarVisto,
  listarAlertasNaoVistos,
  listarAlertasNaoVistosPorData,
  listarPorData
}