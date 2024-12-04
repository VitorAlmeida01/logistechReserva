function analisar(){
  var unidades = Number(ipt_unidades.value);
  var valor = Number(ipt_valor.value);
  var rendaMensal = Number(ipt_renda.value);
  var rendaCalculada = (unidades * valor)
  if (rendaCalculada > rendaMensal){
    modal_resultado_simulador.style.display = 'flex';
    modal_resultado.style.display = 'flex';
    mensagem_simulador.innerHTML = `Faturamento mensal: <b style=color:red> R$${rendaMensal} </b> <br><br> <span>Situação:<b style=color:red>R$ ${  rendaCalculada - rendaMensal} </b>abaixo do valor esperado </span> <br><br>Pode indicar um possivel extravio de produtos em seu armazem <br> <br> Para averiguar o possível problema entre em contato conosco.`
  } else if (rendaCalculada < rendaMensal){
    modal_resultado_simulador.style.display = 'flex';
    modal_resultado.style.display = 'flex';
    mensagem_simulador.innerHTML = `Faturamento mensal: <b style=color:green> R$ ${rendaMensal} </b> <br>Situação: <b style=color:green>acima do esperado </b><p style=color:green> <br>O que pode ser uma boa noticia </p> <p style=color:red> ou algum erro grave no calculo da renda mensal </p> para averiguar esse possivel problema entre em contato conosco`
  } else if (rendaCalculada == rendaMensal){
    modal_resultado_simulador.style.display = 'flex';
    modal_resultado.style.display = 'flex';
    mensagem_simulador.innerHTML = `<b style=color:green> Seu faturamento mensal está de acordo com a produção</b><br>  Caso queira saber mais sobre como automatizar a produção, entre em contato conosco </b>  `
  }
}
function fecharResultado(){
    modal_resultado_simulador.style.display = 'none';
    modal_resultado.style.display = 'none';
  }