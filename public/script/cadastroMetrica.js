//Seleciono o botão para abrir e fechar o modal
const openButton = document.getElementById('btnCadastro')
const closeButton = document.getElementById('closeButton')

//Adiciono um ouvinte de click no botão para abrir o modal
    openButton.addEventListener('click', () => {
        //O valor de data-modal é atribuido a constante modalId
        const modalId = openButton.getAttribute('data-modal');
        //O valor modal-1 está na tag dialog, sendo referenciado pelo valor que está dentro de data-modal
        const modal = document.getElementById(modalId);
        //adiciona a classe show ao elemento modal
        modal.classList.add('show');
        //função nativa do js que abre o modal
        modal.showModal();
        editBtn.style.display = 'none';
        cadastroBtn.style.display = 'block';
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

     //O valor de data-modal é atribuido a constante modalId
     const modalId = openButton.getAttribute('data-modal');
     //O valor modal-1 está na tag dialog, sendo referenciado pelo valor que está dentro de data-modal
     const modal = document.getElementById(modalId);
 

    const nomeMetrica = document.getElementById('inpNome').value;
    const valorMinimo = document.getElementById('inpValorMinimo').value;
    const valorMaximo = document.getElementById('inpValorMaximo').value;
    const cor = document.getElementById('inpCor').value;

    let containerAviso = document.getElementById('container-aviso')

    console.log(nomeMetrica, valorMaximo, valorMinimo)

    if(nomeMetrica === "" ||  valorMinimo === ""  || valorMaximo === ""){
        let aviso = document.createElement('p')
        aviso.textContent = 'Preencha os campos'
        aviso.style.color = 'red'
        containerAviso.innerHTML = "";
        containerAviso.appendChild(aviso)
        return;
    }else{
        var esteiraSelecionada = Number(slt_esteiras.value);
        var body = {
            nome: inpNome.value,
            valorMinimo: Number(inpValorMinimo.value),
            valorMaximo: Number(inpValorMaximo.value),
            cor: (inpCor.value).replace('#', ''),
            fkEsteira: esteiraSelecionada
        }
        console.log(body);

        fetch(`/metricas/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then((resposta) => {
            console.log(resposta)
            if(resposta.status == 200) {
                alert("Métrica cadastrado com sucesso.");
                window.location.reload();
            } else if (resposta.status == 400) {
               resposta.json()
                .then((erro) => {
                    console.log(erro)
                })
                .catch((erro) => {
                    console.log(erro)
                })
                
            }
        })
        .catch(erro => {
            console.log(erro)
        })

        // depois que cadastrei, devo desaparecer com o modal de cadastro
        const modalId = closeButton.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        modal.close();
    
        
        }


    
 }) 