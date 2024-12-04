// const { atualizarEsteira } = require("../controllers/esteiraController")
var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, departamento, localizacao, distanciaEsperada, fkEmpresa) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES ('${nome}' ,'${departamento}', '${localizacao}', ${distanciaEsperada}, '${fkEmpresa}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTodasEsteiras(fkEmpresa) {
    var instrucaoSql = `
    SELECT idEsteira, nome, departamento, localizacao, distanciaEsperada, nomeFantasia FROM esteira JOIN empresa ON fkEmpresa = idEmpresa WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarEsteira(idEsteira) {
    var instrucaoSql = `
    DELETE FROM esteira WHERE idEsteira = ${idEsteira};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarEsteira(idEsteira, nome, departamento, localizacao, distanciaEsperada){
    var instrucaoSql = `
    UPDATE esteira
    SET nome = '${nome}', departamento = '${departamento}', localizacao = '${localizacao}', distanciaEsperada = ${distanciaEsperada}
    WHERE idEsteira = ${idEsteira};
    ` 
    return database.executar(instrucaoSql)
}

function listarValidosPorEsteira(idEmpresa){
    var instrucaoSql = `
        SELECT e.nome AS Esteira, 
            IFNULL(SUM(CASE WHEN r.distancia <= e.distanciaEsperada THEN 1 ELSE 0 END), 0) AS ProdutosValidos
        FROM esteira e 
        LEFT JOIN sensor s ON e.idEsteira = s.fkEsteira 
        LEFT JOIN registro r ON s.idSensor = r.fkSensor 
        WHERE e.fkEmpresa = ${idEmpresa}
        GROUP BY e.nome;
    ` 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function listarInvalidosPorEsteira(idEmpresa){
    var instrucaoSql = `
        SELECT e.nome AS Esteira, 
            IFNULL(SUM(CASE WHEN r.distancia > e.distanciaEsperada THEN 1 ELSE 0 END), 0) AS ProdutosInvalidos
        FROM esteira e 
        LEFT JOIN sensor s ON e.idEsteira = s.fkEsteira 
        LEFT JOIN registro r ON s.idSensor = r.fkSensor 
        WHERE e.fkEmpresa = ${idEmpresa}
        GROUP BY e.nome;
    ` 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function pesquisarEsteira(idEmpresa, nome){
    var instrucaoSql = `
    SELECT * FROM esteira WHERE fkEmpresa = ${idEmpresa} AND nome LIKE '%${nome}%';
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function filtrarEsteira(idEsteira){

    var instrucaoSql = `
    SELECT esteira.nome AS nomEsteira,
    esteira.departamento AS Esteira, registro.distancia AS AlturaDetectada, registro.dataRegistro AS DataRegistro FROM esteira 
    JOIN sensor ON sensor.fkEsteira = esteira.idEsteira JOIN registro ON registro.fkSensor = sensor.idSensor JOIN empresa ON esteira.fkEmpresa = empresa.idEmpresa
    WHERE idEsteira = ${idEsteira} ORDER BY DATE(dataRegistro) DESC;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)


}

module.exports = {
    cadastrar,
    listarTodasEsteiras,
    deletarEsteira,
    editarEsteira,
    listarValidosPorEsteira,
    listarInvalidosPorEsteira,
    pesquisarEsteira,
    filtrarEsteira
};