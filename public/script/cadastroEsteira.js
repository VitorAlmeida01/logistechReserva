//Seleciono o botão para abrir e fechar o modal
const openButton = document.getElementById('btnCadastro')
// const closeButton = document.getElementById('closeButton')

//Adiciono um ouvinte de click no botão para abrir o modal
    openButton.addEventListener('click', () => {
        //O valor de data-modal é atribuido a constante modalId
        const modalId = openButton.getAttribute('data-modal');
        //O valor modal-1 está na tag dialog, sendo referenciado pelo valor que está dentro de data-modal
        const modal = document.getElementById('modal-form');
        //adiciona a classe show ao elemento modal
        modal.classList.add('show');
        //função nativa do js que abre o modal
        modal.showModal();
    });

    closeButton.addEventListener('click', () => {
        const modalId = closeButton.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        modal.close();
    });


function dataAtual() {
    return new Date().toLocaleDateString('pt-BR');
}

function gerarAleatorio(){
    return Math.floor((Math.random() * 1000))
}

function horarioAleatorio(){
    let hora = Math.floor((Math.random() * 25))
    let minuto = Math.floor((Math.random() * 60))

    if (hora < 10){
        hora = `0${hora}`
    }

    if(minuto < 10){
        minuto = `0${minuto}`
    }

    return `${hora}:${minuto}`
}

document.getElementById('cadastroBtn').addEventListener('click', () => {
    const nomeEsteira = document.getElementById('inpDep')
    const depEsteira = document.getElementById('inpLoc')
    const tamanhoEsteira = document.getElementById('inpTamanho')

    let containerAviso = document.getElementById('container-aviso')
    let conteudoExistente = containerAviso.querySelectorAll('p').length

    if((nomeEsteira.value === '' && depEsteira.value === '' && tamanhoEsteira.value === '') && conteudoExistente < 1){
        let aviso = document.createElement('p')
        aviso.textContent = 'Preencha os campos'
        aviso.style.color = 'red'
        containerAviso.appendChild(aviso)
        return
    }else if (nomeEsteira.value === '' && depEsteira.value === '' && tamanhoEsteira.value === ''){
        return

    }else{

        let ultimoElemento = containerAviso.lastElementChild

        if(ultimoElemento)
            containerAviso.removeChild(ultimoElemento)
        
        let divEsteira = document.getElementsByClassName('containerEsteiras')[0]

        let cardEsteira = document.createElement('div')
        cardEsteira.classList.add('cardEsteira')

        let leftContainer = document.createElement('div')
        leftContainer.classList.add('leftContainer')

        let verticalLine = document.createElement('div')
        verticalLine.classList.add('verticalLine')

        let rightContainer = document.createElement('div')
        rightContainer.classList.add('rightContainer')

        let h6 = document.createElement('h6')
        h6.textContent = 'Esteira'

        let nome = document.createElement('p')
        nome.textContent = 'Nome'

        let esteira = document.createElement('p')
        esteira.textContent = nomeEsteira.value
        esteira.classList.add = 'esteiraNome'

        let dep = document.createElement('p')
        dep.textContent = 'Departamento'

        let depNome = document.createElement('p')
        depNome.textContent = depEsteira.value

        let tamanho  = document.createElement('p')
        tamanho.textContent = 'Tamanho do produto'

        let tamanhoProduto = document.createElement('p')
        tamanhoProduto.textContent = tamanhoEsteira.value + ' cm'

        let dtCadastro = document.createElement('p')
        dtCadastro.textContent = 'Data de cadastro'

        let data = document.createElement('p')
        data.textContent = dataAtual()

        let produtosV = document.createElement('p')
        produtosV.textContent = 'Produtos válidos registrados'

        let produtosValidos = document.createElement('p')
        produtosValidos.textContent = gerarAleatorio()

        let produtosI = document.createElement('p')
        produtosI.textContent = 'Produtos inválidos registrados'

        let produtosInvalidos = document.createElement('p')
        produtosInvalidos.textContent = gerarAleatorio()

        let alertas = document.createElement('p')
        alertas.textContent = 'Alertas gerados'

        let alertasGerados = document.createElement('p')
        alertasGerados.textContent = gerarAleatorio()

        let horario = document.createElement('p')
        horario.textContent = 'Horário com mais desvio'

        let horarioDesvio = document.createElement('p')
        horarioDesvio.textContent = horarioAleatorio()

        cardEsteira.classList.add('hidden');



        
        divEsteira.appendChild(cardEsteira)
        cardEsteira.appendChild(leftContainer)
        leftContainer.appendChild(h6)
        leftContainer.appendChild(nome)
        leftContainer.appendChild(esteira)
        leftContainer.appendChild(dep)
        leftContainer.appendChild(depNome)
        leftContainer.appendChild(tamanho)
        leftContainer.appendChild(tamanhoProduto)
        leftContainer.appendChild(dtCadastro)
        leftContainer.appendChild(data)
        cardEsteira.appendChild(verticalLine)
        cardEsteira.appendChild(rightContainer)
        rightContainer.appendChild(produtosV)
        rightContainer.appendChild(produtosValidos)
        rightContainer.appendChild(produtosI)
        rightContainer.appendChild(produtosInvalidos)
        rightContainer.appendChild(alertas)
        rightContainer.appendChild(alertasGerados)
        rightContainer.appendChild(horario)
        rightContainer.appendChild(horarioDesvio)

        document.getElementById('inpDep').value = ''
        document.getElementById('inpLoc').value = ''
        document.getElementById('inpTamanho').value = ''

        cardEsteira.classList.add('show');
        }


    
 }) 