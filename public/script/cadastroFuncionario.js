
// document.addEventListener('DOMContentLoaded', function () {
// //Seleciono o botão para abrir e fechar o modal
// // const openButton = document.getElementById('btnCadastro')
// // const closeButton = document.getElementById('closeButton')

// //Adiciono um ouvinte de click no botão para abrir o modal
//     openButton.addEventListener('click', () => {
//         //O valor de data-modal é atribuido a constante modalId
//         const modalId = openButton.getAttribute('data-modal');
//         //O valor modal-1 está na tag dialog, sendo referenciado pelo valor que está dentro de data-modal
//         const modal = document.getElementById(modalId);
//         //adiciona a classe show ao elemento modal
//         modal.classList.add('show');
//         //função nativa do js que abre o modal
//         modal.showModal();
//     });

//     closeButton.addEventListener('click', () => {
//         const modalId = closeButton.getAttribute('data-modal');
//         const modal = document.getElementById(modalId);
//         modal.classList.remove('show');
//         modal.close();
//     });
// })


    // closeButton.addEventListener('click', () => {
    //     const modalId = closeButton.getAttribute('data-modal');
    //     const modal = document.getElementById(modalId);
    //     modal.classList.remove('show');
    //     modal.close();
    //     });



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

// document.getElementById('cadastroBtn').addEventListener('click', () => {




//     const nomeFuncionario = document.getElementById('inpNome').value;
//     const email = document.getElementById('inpEmail').value;
//     const senha = document.getElementById('inpSenha').value;
//     const telefone = document.getElementById('inpTelefone').value;

//     let containerAviso = document.getElementById('container-aviso')
//     let conteudoExistente = containerAviso.querySelectorAll('p').length

//     if((nomeFuncionario.value === '' ||  email.value === ''  || senha.value === '' || telefone === '') && conteudoExistente < 1){
//         let aviso = document.createElement('p')
//         aviso.textContent = 'Preencha os campos'
//         aviso.style.color = 'red'
//         containerAviso.appendChild(aviso)
//         return
//     }else{
//         console.log("cadastrei")
//         div_containerEsteiras.innerHTML += `


//         `;

//         // depois que cadastrei, devo desaparecer com o modal de cadastro
//         const modalId = closeButton.getAttribute('data-modal');
//         const modal = document.getElementById(modalId);
//         modal.classList.remove('show');
//         modal.close();
    
        
//         }


    
//  }) 