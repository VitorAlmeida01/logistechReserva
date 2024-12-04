



// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

// Aqui são criadas variáveis para referenciar os arquivos de rotas usados pela aplicação
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresaRouter = require("./src/routes/empresas")
var enderecoRouter = require("./src/routes/enderecos");
var esteiraRouter = require("./src/routes/esteiras");
var registroRouter = require("./src/routes/registros");
var alertaRouter = require("./src/routes/alertas");
var metricasRouter = require("./src/routes/metricas");
var bobIaRouter = require("./src/routes/bobia")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Aqui é definido, pela aplicação, as rotas que serão usadas e qual arquivos devem referenciar.
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresaRouter);
app.use("/enderecos", enderecoRouter);
app.use("/esteiras", esteiraRouter);
app.use("/registros", registroRouter);
app.use("/metricas", metricasRouter);
app.use("/registros", registroRouter);
app.use("/alertas", alertaRouter);
app.use("/bobia", bobIaRouter)


app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    vaga <3

    ##        ########   #########   ##    #########   ##########   #######   ########   ##     ##
    ##        ##    ##   ##     ##   ##    ##              ##       ##        ##         ##     ## 
    ##        ##    ##   ##     ##   ##    ##              ##       ##        ##         ##     ##
    ##        ##    ##   ##          ##    ##              ##       ##        ##         ##     ##
    ##        ##    ##   ##   ####   ##    #########       ##       #######   ##         #########
    ##        ##    ##   ##     ##   ##           ##       ##       ##        ##         ##     ##
    ##        ##    ##   ##     ##   ##           ##       ##       ##        ##         ##     ##
    ##        ##    ##   ##     ##   ##           ##       ##       ##        ##         ##     ##
    #######   ########   #########   ##    #########       ##       #######   ########   ##     ##  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
