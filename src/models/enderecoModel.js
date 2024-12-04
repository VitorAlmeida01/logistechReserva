var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(cep, logradouro, cidade, uf, numero, complemento, fkEmpresa) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO endereco (cep, logradouro, cidade, uf, numero, complemento, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${cidade}', '${uf}', '${numero}', '${complemento}', '${fkEmpresa}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};