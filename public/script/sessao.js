if (!sessionStorage.getItem("idUsuario")) {
    window.location.href = "/login.html"
}



function deslogar() {
    sessionStorage.clear();
    window.location.reload()
}
   
   // adicionando nome à coluna lateral
   var idUsuario = sessionStorage.getItem("idUsuario");
    fetch(`/usuarios/listarPorId/${idUsuario}`, {
      method: "GET",
    })
      .then((resposta) => {
        resposta
          .json()
          .then((resultado) => {
            // renderizando barra lateral de acordo com nível do usuário
            if (resultado[0].nivel == 1) {
              barralateral.innerHTML = `<div class="div-imagem-perfil">
              <img src="../img/perfilexemplo.png" class="perfil-foto" alt="foto de perfil" />
            </div>
            <h4 id="nomeFuncionario">${resultado[0].nome}</h4>
            <h4 id="nomeEmpresa">${resultado[0].nomeFantasia}</h4>
            <div class="option selected">
              <i class="fa-solid fa-chart-line"></i>
              <span><a href="./dashboard.html">Dashboard Geral</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-chart-line"></i>
              <span><a href="./dashPorEsteira.html">Dash por Esteira</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-circle-plus"></i>
              <span><a href="./cadastroEsteira.html">Esteira</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-book"></i>
              <span><a href="./historico.html">Histórico</a></span>
            </div>
            <div class="option">
              <i class="fa-regular fa-bell"></i>
              <span><a href="./alertas.html">Alertas</a></span>
            </div>
      
            <div class="option">
              <i class="fa-solid fa-gauge"></i>
              <span><a href="./metricas.html">Métricas</a></span>
            </div>

            <div class="option">
              <i class="fa-solid fa-user"></i>
              <span><a href="./cadastroFuncionario.html">Funcionários</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-headset"></i>
              <span><a href="./atendimento.html">Suporte</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-door-open"></i>
              <span><a onclick="deslogar()">Sair</a></span>
            </div>`;
            } else {
              barralateral.innerHTML = `<div class="div-imagem-perfil">
              <img src="../img/perfilexemplo.png" class="perfil-foto" alt="foto de perfil" />
            </div>
            <h4 id="nomeFuncionario">${resultado[0].nome}</h4>
            <h4 id="nomeEmpresa">${resultado[0].nomeFantasia}</h4>
            <div class="option selected">
              <i class="fa-solid fa-chart-line"></i>
              <span><a href="./dashboard.html">Dashboard Geral</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-chart-line"></i>
              <span><a href="./dashPorEsteira.html">Dash por Esteira</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-book"></i>
              <span><a href="./historico.html">Histórico</a></span>
            </div>
            <div class="option">
              <i class="fa-regular fa-bell"></i>
              <span><a href="./alertas.html">Alertas</a></span>
            </div>   
            <div class="option">
              <i class="fa-solid fa-headset"></i>
              <span><a href="./atendimento.html">Suporte</a></span>
            </div>
            <div class="option">
              <i class="fa-solid fa-door-open"></i>
              <span><a onclick="deslogar()">Sair</a></span>
            </div>`;
            }
         
            // console.log(resultado)
            nomeFuncionario.innerHTML = resultado[0].nome;
          })
          .catch((erro) => {
            console.log(erro);
          });
      })
      .catch((erro) => {
        console.log(erro);
      });
  