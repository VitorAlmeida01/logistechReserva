var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
       SELECT idUsuario, nome, email, fkEmpresa, isAtivo, nivel FROM usuario
      LEFT JOIN empresa ON fkEmpresa = idEmpresa
       WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, fkEmpresa, nivel) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa, nivel) VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${nivel});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorEmpresa(idEmpresa) {
    var instrucaoSql = `
    SELECT usuario.* FROM usuario 
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE idEmpresa = ${idEmpresa}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarUsuario(idUsuario){
    var instrucaoSql = `
    DELETE FROM usuario WHERE idUsuario = ${idUsuario} 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarUsuario(idUsuario, nome, email, senha){
    var instrucaoSql = `
    UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' 
    WHERE idUsuario = ${idUsuario}
    `
    return database.executar(instrucaoSql)
}

function verificarEmailExistente(email) {
    var instrucaoSql = `SELECT * from usuario where email = '${email}'`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarEmailExistenteUpdate(emailNovo, emailAntigo) {
    var instrucaoSql = `
        SELECT * 
        FROM usuario 
        WHERE email = '${emailNovo}' AND email != '${emailAntigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorId(idUsuario) {
    var instrucaoSql = `
    SELECT usuario.nome, usuario.nivel, empresa.nomeFantasia FROM usuario LEFT JOIN empresa ON fkEmpresa = idEmpresa WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarUsuario(idEmpresa, email){
    var instrucaoSql = `
    SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa} AND email LIKE '%${email}%'
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    listarPorEmpresa,
    deletarUsuario,
    editarUsuario,
    listarPorId,
    pesquisarUsuario,
    verificarEmailExistente,
    verificarEmailExistenteUpdate
};