var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(razaoSocial, cnpj, telefone) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (nomeFantasia, cnpj, telefone) VALUES ('${razaoSocial}', '${cnpj}', '${telefone}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorId(idEmpresa) {
    var instrucaoSql = `
    SELECT * FROM empresa where idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarInativas() {
    var instrucaoSql = `SELECT * FROM listarInativas;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function aprovarEmpresa(idEmpresa) {
    var instrucaoSql = `update empresa set isAtivo = 1 WHERE idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function reprovarEmpresa(idEmpresa) {
    var instrucaoSql = `delete from empresa WHERE idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listarPorId,
    listarInativas,
    aprovarEmpresa,
    reprovarEmpresa
};