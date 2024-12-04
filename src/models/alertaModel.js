var database = require("../database/config")

function listarTodosAlertas(fkEmpresa) {
    var instrucaoSql = `
   SELECT 
        esteira.nome AS 'nomeEsteira',
        esteira.departamento AS 'Esteira', 
        registro.distancia as 'distancia', 
        registro.dataRegistro AS 'Data',
        CASE 
            WHEN Alerta.visto = 1 THEN 'Sim'
            ELSE 'Não'
        END AS 'Visto',
        Alerta.idAlerta,  -- Adicionar o idAlerta aqui
        registro.idRegistro AS fkRegistro  -- Adicionar o fkRegistro aqui
        FROM Alerta 
        JOIN registro ON Alerta.fkRegistro = registro.idRegistro
        JOIN sensor ON registro.fkSensor = sensor.idSensor
        JOIN esteira ON sensor.fkEsteira = esteira.idEsteira
        JOIN empresa on esteira.fkEmpresa = empresa.idEmpresa
        WHERE empresa.idEmpresa = ${fkEmpresa}
ORDER BY registro.dataRegistro DESC;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAlertasNaoVistos(fkEmpresa) {
    var instrucaoSql = `
    SELECT 
         esteira.departamento AS 'Esteira', 
         registro.distancia as 'distancia', 
         registro.dataRegistro AS 'Data',
         CASE 
             WHEN Alerta.visto = 1 THEN 'Sim'
             ELSE 'Não'
         END AS 'Visto',
         Alerta.idAlerta,  -- Adicionar o idAlerta aqui
         registro.idRegistro AS fkRegistro  -- Adicionar o fkRegistro aqui
         FROM Alerta 
         JOIN registro ON Alerta.fkRegistro = registro.idRegistro
         JOIN sensor ON registro.fkSensor = sensor.idSensor
         JOIN esteira ON sensor.fkEsteira = esteira.idEsteira
         JOIN empresa on esteira.fkEmpresa = empresa.idEmpresa
         WHERE empresa.idEmpresa = ${fkEmpresa} AND Alerta.visto = 0
 ORDER BY registro.dataRegistro DESC;
 
     `;
     console.log("Executando a instrução SQL: \n" + instrucaoSql);
     return database.executar(instrucaoSql);
}

function atualizarVisto(idAlerta, visto, fkRegistro) {
    var instrucaoSql = `
    UPDATE Alerta 
    SET visto = ${visto} 
    WHERE idAlerta = ${idAlerta} AND fkRegistro = ${fkRegistro};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function listarAlertasNaoVistosPorData(dataInicial, dataFinal, fkEmpresa) {
    var instrucaoSql = `
    SELECT 
        esteira.departamento AS 'Esteira', 
        registro.distancia AS 'distancia', 
        registro.dataRegistro AS 'Data',
        CASE 
            WHEN Alerta.visto = 1 THEN 'Sim'
            ELSE 'Não'
        END AS 'Visto',
        Alerta.idAlerta,  -- Adicionar o idAlerta aqui
        registro.idRegistro AS fkRegistro  -- Adicionar o fkRegistro aqui
    FROM Alerta 
    JOIN registro ON Alerta.fkRegistro = registro.idRegistro
    JOIN sensor ON registro.fkSensor = sensor.idSensor
    JOIN esteira ON sensor.fkEsteira = esteira.idEsteira
    JOIN empresa ON esteira.fkEmpresa = empresa.idEmpresa
    WHERE empresa.idEmpresa = ${fkEmpresa} 
    AND Alerta.visto = 0  -- Filtro para alertas não vistos
    AND DATE(registro.dataRegistro) >= '${dataInicial}'  -- Filtro de data inicial
    AND DATE(registro.dataRegistro) <= '${dataFinal}'  -- Filtro de data final
    ORDER BY registro.dataRegistro DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarAlertasPorData(dataInicial, dataFinal, fkEmpresa) {
    var instrucaoSql = `
   SELECT 
        esteira.departamento AS 'Esteira', 
        registro.distancia AS 'distancia', 
        registro.dataRegistro AS 'Data',
        CASE 
            WHEN Alerta.visto = 1 THEN 'Sim'
            ELSE 'Não'
        END AS 'Visto',
        Alerta.idAlerta,  -- Adicionar o idAlerta aqui
        registro.idRegistro AS fkRegistro  -- Adicionar o fkRegistro aqui
    FROM Alerta 
    JOIN registro ON Alerta.fkRegistro = registro.idRegistro
    JOIN sensor ON registro.fkSensor = sensor.idSensor
    JOIN esteira ON sensor.fkEsteira = esteira.idEsteira
    JOIN empresa ON esteira.fkEmpresa = empresa.idEmpresa
    WHERE empresa.idEmpresa = 1
    AND DATE(registro.dataRegistro) >= '${dataInicial}'  -- Filtro de data inicial
    AND DATE(registro.dataRegistro) <= '${dataFinal}'  -- Filtro de data final
    ORDER BY registro.dataRegistro DESC;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTodosAlertas,
    atualizarVisto,
    listarAlertasNaoVistos,
    listarAlertasPorData,
    listarAlertasNaoVistosPorData
};