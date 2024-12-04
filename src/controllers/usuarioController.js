var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.login;
  var senha = req.body.senha;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          res.status(200).json(resultadoAutenticar);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var fkEmpresa = req.body.fkEmpresa;
  var isSupervisor = (req.body.isSupervisor == undefined? false: true);

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua empresa a vincular está undefined!");
  } else {
    var nivel = 0;

    if (isSupervisor) {
      nivel = 1;
    }

    // verificando e-mail existente
    usuarioModel.verificarEmailExistente(email)
    .then(resultado => {
      // não existe usuario cadastrado com esse e-mail
      if (resultado.length == 0) {
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, nivel)
        .then(function (resultado) {
          res.json(resultado);
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
  
      } else {
        res.status(400).send("E-mail já está em uso, tente novamente.");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });

      


    
  }
}

function listarPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("IdEmpresa indefinido.");
  } else {
    usuarioModel
      .listarPorEmpresa(idEmpresa)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  if (idUsuario == undefined) {
      res.status(400).send("ID do usuario indefinido");
  } else {
      usuarioModel.deletarUsuario(idUsuario)
          .then(
              function (resultado) {
                  res.status(200).json(resultado);
              }
          )
          .catch(function (erro) {
              console.log(erro);
              console.log(
                  "\nHouve um erro ao deletar o usuário! Erro: ",
                  erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
          })
  }
}

function editarUsuario(req, res){
  var idUsuario = req.params.idUsuario;
  var nome = req.body.nome
  var email = req.body.email
  var senha = req.body.senha

  if (idUsuario == undefined) {
    res.status(400).send("ID do usuario indefinido");
} else {
  
    usuarioModel.editarUsuario(idUsuario, nome, email, senha)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao editar o usuário! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
}

}

function listarPorId(req, res) {
    // Recebendo parametro da URL 
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário indefinido");
     } else {
        usuarioModel.listarPorId(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        )
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a listagem do usuário Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
     }

}

function pesquisarUsuario(req, res){
  var idEmpresa = req.params.idEmpresa
  var email = req.params.email
  if (idEmpresa == undefined) {
    res.status(400).send("ID da empresa indefinido");
 } else {
    usuarioModel.pesquisarUsuario(idEmpresa, email)
    .then(
        function (resultado) {
            res.status(200).json(resultado);
        }
    )
    .catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao realizar a filtragem do usuário Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
 }
}

module.exports = {
  autenticar,
  cadastrar,
  listarPorEmpresa,
  deletarUsuario,
  editarUsuario,
  listarPorId,
  pesquisarUsuario
};
