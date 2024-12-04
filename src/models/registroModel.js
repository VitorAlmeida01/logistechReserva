var database = require("../database/config")

function listarTodosRegistros(fkEmpresa) {
    var instrucaoSql = `
    SELECT esteira.nome AS esteiraNome, esteira.departamento AS Esteira, registro.distancia AS AlturaDetectada, registro.dataRegistro AS DataRegistro 
    FROM esteira JOIN sensor ON sensor.fkEsteira = esteira.idEsteira JOIN registro ON registro.fkSensor = sensor.idSensor 
    JOIN empresa ON esteira.fkEmpresa = empresa.idEmpresa WHERE empresa.idEmpresa = ${fkEmpresa} ORDER BY registro.dataRegistro DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarRegistrosPorData(dataInicial, dataFinal, fkEmpresa) {
    var instrucaoSql = `
    SELECT esteira.nome as nomEsteira,
    esteira.departamento AS Esteira, registro.distancia AS AlturaDetectada, registro.dataRegistro AS DataRegistro FROM esteira JOIN sensor ON sensor.fkEsteira = esteira.idEsteira JOIN registro ON registro.fkSensor = sensor.idSensor JOIN empresa ON esteira.fkEmpresa = empresa.idEmpresa WHERE empresa.idEmpresa = ${fkEmpresa} AND DATE(registro.dataRegistro) BETWEEN '${dataInicial}' AND '${dataFinal}' ORDER BY registro.dataRegistro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarProdutosValidosInvalidosTotalEmpresa(fkEmpresa) {
    var instrucaoSql = `
    SELECT 
    COUNT(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 END) AS "ProdutosValidos",
    COUNT(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 END) AS "ProdutosInvalidos"
    FROM registro AS r
    JOIN sensor AS s ON r.fkSensor = s.idSensor
    JOIN esteira AS e ON s.fkEsteira = e.idEsteira
    JOIN empresa AS emp ON e.fkEmpresa = emp.idEmpresa
    WHERE emp.idEmpresa = ${fkEmpresa};
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarProdutosValidosInvalidosPorSemanaEmpresa(fkEmpresa) {
    var instrucaoSql = `
    SELECT DATE(r.dataRegistro) AS 'data', 
    IFNULL(SUM(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 ELSE 0 END),0) AS ProdutosValidos, 
    IFNULL(SUM(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 ELSE 0 END),0) AS ProdutosInvalidos 
    FROM registro AS r LEFT JOIN sensor AS s ON r.fkSensor = s.idSensor LEFT JOIN esteira AS e ON s.fkEsteira = e.idEsteira 
    LEFT JOIN empresa AS emp ON e.fkEmpresa = emp.idEmpresa WHERE emp.idEmpresa = ${fkEmpresa} AND DATE(r.dataRegistro) >= CURRENT_DATE() - INTERVAL 6 DAY 
    AND DATE(r.dataRegistro) < CURDATE() + INTERVAL 1 DAY GROUP BY DATE(r.dataRegistro) ORDER BY DATE(r.dataRegistro);
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarValidosInvalidosTodasEsteirasEmpresa(fkEmpresa) {
    var instrucaoSql = `
    SELECT e.nome AS Esteira, 
       IFNULL(SUM(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 ELSE 0 END), 0) AS ProdutosValidos, 
       IFNULL(SUM(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 ELSE 0 END), 0) AS ProdutosInvalidos
FROM esteira e LEFT JOIN sensor s ON e.idEsteira = s.fkEsteira LEFT JOIN registro r ON s.idSensor = r.fkSensor 
WHERE e.fkEmpresa = ${fkEmpresa} GROUP BY e.nome;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarProdutosValidosInvalidosTotalEsteiraEmpresa(fkEmpresa, idEsteira) {
    var instrucaoSql = `
    SELECT 
    COUNT(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 END) AS "ProdutosValidos",
    COUNT(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 END) AS "ProdutosInvalidos"
    FROM registro AS r
    JOIN sensor AS s ON r.fkSensor = s.idSensor
    JOIN esteira AS e ON s.fkEsteira = e.idEsteira
    JOIN empresa AS emp ON e.fkEmpresa = emp.idEmpresa
    WHERE emp.idEmpresa = ${fkEmpresa} AND e.idEsteira = ${idEsteira};
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarProdutosValidosInvalidosPorSemanaEsteiraEmpresa(fkEmpresa, idEsteira) {
    var instrucaoSql = `
    SELECT DATE(r.dataRegistro) AS 'data', 
    IFNULL(SUM(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 ELSE 0 END),0) AS ProdutosValidos, 
    IFNULL(SUM(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 ELSE 0 END),0) AS ProdutosInvalidos 
    FROM registro AS r LEFT JOIN sensor AS s ON r.fkSensor = s.idSensor LEFT JOIN esteira AS e ON s.fkEsteira = e.idEsteira 
    LEFT JOIN empresa AS emp ON e.fkEmpresa = emp.idEmpresa WHERE emp.idEmpresa = ${fkEmpresa} AND e.idEsteira = ${idEsteira} AND DATE(r.dataRegistro) >= CURRENT_DATE() - INTERVAL 6 DAY 
    AND DATE(r.dataRegistro) < CURDATE() + INTERVAL 1 DAY GROUP BY DATE(r.dataRegistro) ORDER BY DATE(r.dataRegistro);
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function listarProdutosValidosInvalidosTempoReal(fkEmpresa, idEsteira) {
    var instrucaoSql = `
    SELECT r.dataRegistro,
    SUM(CASE WHEN r.distancia = e.distanciaEsperada THEN 1 ELSE 0 END) AS ProdutosValidos, 
    SUM(CASE WHEN r.distancia <> e.distanciaEsperada THEN 1 ELSE 0 END) AS ProdutosInvalidos 
    FROM registro AS r JOIN sensor AS s ON r.fkSensor = s.idSensor JOIN esteira AS e ON 
    s.fkEsteira = e.idEsteira JOIN empresa AS emp ON e.fkEmpresa = emp.idEmpresa 
    WHERE emp.idEmpresa = ${fkEmpresa} AND e.idEsteira = ${idEsteira} GROUP BY r.dataRegistro ORDER BY r.dataRegistro DESC LIMIT 6;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

module.exports = {
    listarTodosRegistros,
    listarRegistrosPorData,
    listarProdutosValidosInvalidosTotalEmpresa,
    listarProdutosValidosInvalidosPorSemanaEmpresa,
    listarValidosInvalidosTodasEsteirasEmpresa,
    listarProdutosValidosInvalidosTotalEsteiraEmpresa,
    listarProdutosValidosInvalidosPorSemanaEsteiraEmpresa,
    listarProdutosValidosInvalidosTempoReal
};