var mysql = require("mysql2");

// CONFIGURAÇÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
port: process.env.DB_PORT
};

var pool = mysql.createPool({
...mySqlConfig,
waitForConnections: true,
connectionLimit: 0,
queueLimit: 0
});

const poolPromise = pool.promise();

function executar(instrucao) {
if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
}
return new Promise((resolve, reject) => {
    poolPromise.query(instrucao)
        .then(([resultados]) => {
        console.log(resultados);
        resolve(resultados);
    })
    .catch((erro) => {
        console.error("Erro ao executar a query:", erro.sqlMessage || erro);
        reject(erro);
        });
    });
}

module.exports = {
executar
};