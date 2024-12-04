CREATE DATABASE logistech;
USE logistech;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14),
telefone CHAR(12),
nomeFantasia VARCHAR(45),
dataCadastro DATETIME DEFAULT current_timestamp,
isAtivo TINYINT DEFAULT 0,
CONSTRAINT chk_ativo CHECK(isAtivo IN(0, 1))
);




CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
nivel INT default 0,
dataCadastro DATETIME DEFAULT current_timestamp,
fkEmpresa INT,
CONSTRAINT fkUsuarioEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
ON DELETE CASCADE
);


CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
cep CHAR(8),
logradouro VARCHAR(200),
cidade VARCHAR(90),
UF CHAR(2),
numero CHAR(5),
complemento VARCHAR(50),
fkEmpresa INT,
CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
ON DELETE CASCADE
);

CREATE TABLE esteira(
idEsteira INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
departamento VARCHAR(50),
localizacao VARCHAR(50),
distanciaEsperada INT,
fkEmpresa INT,
CONSTRAINT fkEsteiraEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
ON DELETE CASCADE
);

CREATE TABLE metrica (
idMetrica INT PRIMARY KEY AUTO_INCREMENT,
nomeMetrica VARCHAR(50),
valorMinimo DOUBLE,
valorMaximo DOUBLE,
dataCadastro DATETIME DEFAULT (CURRENT_TIMESTAMP),
cor CHAR(6),
fkEsteira INT,
CONSTRAINT fkMetricaEsteira FOREIGN KEY (fkEsteira) REFERENCES esteira (idEsteira)
ON DELETE CASCADE
);

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
dataInstalacao DATE,
ultimaManutencao DATE,
fkEsteira INT,
CONSTRAINT fkSensorEsteira FOREIGN KEY (fkEsteira) REFERENCES esteira(idEsteira)
ON DELETE CASCADE
);

CREATE TABLE registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
distancia INT,
dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP(),
isProdutoViavel TINYINT,
CONSTRAINT chkProduto CHECK(isProdutoViavel IN(0,1)),
fkSensor INT,
CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
ON DELETE CASCADE
);

CREATE TABLE Alerta
(idAlerta INT AUTO_INCREMENT,
fkRegistro INT,
visto BIT DEFAULT 0,
PRIMARY KEY (IdAlerta, fkRegistro),
CONSTRAINT fkRegistroAlerta FOREIGN KEY (fkRegistro) REFERENCES registro (idRegistro)
ON DELETE CASCADE
);

-- criação do TRIGGER de geração de alerta
DELIMITER $$

CREATE TRIGGER after_insert_registro
AFTER INSERT ON registro
FOR EACH ROW
BEGIN
    -- Variável para armazenar a distância esperada da esteira
    DECLARE distancia_esperada INT;
    
    -- Buscar a distância esperada da esteira associada ao sensor
    SELECT e.distanciaEsperada
    INTO distancia_esperada
    FROM esteira e
    JOIN sensor s ON s.fkEsteira = e.idEsteira
    WHERE s.idSensor = NEW.fkSensor;
    
    -- Verificar se a distância registrada é diferente da distância esperada
    IF NEW.distancia != distancia_esperada THEN
        -- Inserir um alerta na tabela Alerta, caso as distâncias sejam diferentes
        INSERT INTO Alerta (fkRegistro, visto)
        VALUES (NEW.idRegistro, 0);
    END IF;
END $$

DELIMITER ;



SELECT 
    esteira.departamento AS 'Esteira', registro.distancia as 'distancia', registro.dataRegistro AS 'Data',
    CASE 
        WHEN Alerta.visto = 1 THEN 'Sim'
        ELSE 'Não'
    END AS 'Visto' FROM Alerta 
    JOIN registro ON Alerta.fkRegistro = registro.idRegistro
	JOIN sensor ON registro.fkSensor = sensor.idSensor
	JOIN esteira ON sensor.fkEsteira = esteira.idEsteira
    JOIN empresa on esteira.fkEmpresa = empresa.idEmpresa
    WHERE empresa.idEmpresa = 1
    ORDER BY registro.dataRegistro DESC;

-- Inserções na tabela alertas
INSERT INTO Alerta (fkRegistro, visto) VALUES
(1, 1), 
(2, 0); 


-- 1. Listar todas as empresas ativas
SELECT idEmpresa, nomeFantasia, cnpj, telefone FROM empresa WHERE isAtivo = 1;

-- 2. Buscar usuários e as respectivas empresas
SELECT u.nome AS NomeUsuario, u.email, e.nomeFantasia AS Empresa FROM usuario u
	JOIN empresa e ON u.fkEmpresa = e.idEmpresa;

-- 3. Listar todos os sensores instalados em uma empresa específica
SELECT s.idSensor, s.dataInstalacao, s.ultimaManutencao, e.nomeFantasia AS Empresa FROM sensor s
	JOIN esteira es ON s.fkEsteira = es.idEsteira
	JOIN empresa e ON es.fkEmpresa = e.idEmpresa
	WHERE e.idEmpresa = 1; 
    

-- 4. Exibir registros de sensores com data e hora
SELECT r.idRegistro, r.distancia, r.dataRegistro, s.idSensor FROM registro r
	JOIN sensor s ON r.fkSensor = s.idSensor
	ORDER BY r.dataRegistro DESC;

-- 5. Listar esteiras e seus sensores associados para uma empresa
SELECT es.idEsteira, es.departamento, es.localizacao, s.idSensor, s.dataInstalacao FROM esteira es
	LEFT JOIN sensor s ON es.idEsteira = s.fkEsteira
	WHERE es.fkEmpresa = 1;  
    
UPDATE registro SET isProdutoViavel = 1 WHERE distancia = 15;

SELECT idRegistro, distancia, dataRegistro, CASE WHEN isProdutoViavel = 1 THEN 'Produto Viável' ELSE 'Produto inViável' END AS 'Produto Válido' FROM registro;


SELECT * FROM Registro;
-- Select de quantidade de produtos válidos
SELECT COUNT(idRegistro) AS 'Produtos válidos' FROM registro WHERE distancia = 10;
-- Select de quantidade de produtos inválidos
SELECT COUNT(idRegistro) AS 'Produtos inválidos' FROM registro WHERE distancia != 10;

-- SELECT da porcentagem de produtos válidos VS inválidos
SELECT CONCAT(((SELECT COUNT(idRegistro) AS 'Produtos válidos' FROM registro WHERE distancia = 10) 
/
(SELECT COUNT(idRegistro) FROM registro)) * 100, '%')  AS 'Porcentagem de produtos válidos';

 -- select de porcentagem de produtos inválidos
 SELECT CONCAT(((SELECT COUNT(idRegistro) AS 'Produtos inválidos' FROM registro WHERE distancia != 10) 
/
(SELECT COUNT(idRegistro) FROM registro)) * 100, '%')  AS 'Porcentagem de produtos inválidos';

-- SELECT DE TOTAL DE Produtos por esteira
SELECT esteira.localizacao, COUNT(idRegistro) as 'Quantidade de produtos' FROM Registro 
JOIN Sensor on fkSensor = idSensor
JOIN Esteira on fkEsteira = idEsteira
WHERE fkEsteira = 1;

-- SELECT TOTAL DE PRODUTOS DE MAIS DE 1 ESTEIRA
SELECT COUNT(idRegistro) as 'Quantidade de produtos' FROM Registro 
JOIN Sensor on fkSensor = idSensor
JOIN Esteira on fkEsteira = idEsteira
WHERE fkEsteira = 1 OR fkEsteira = 2;

-- SELECT Alertas 
select * from Alerta;

-- SELECT Alertas não vistos
SELECT * FROM Alerta WHERE visto = 0;

-- Selecionar alertas não vistos e suas respectivas esteiras
SELECT idAlerta, visto, dataRegistro, esteira.localizacao FROM Alerta
JOIN Registro on fkRegistro = idRegistro
JOIN Sensor on fkSensor = idSensor
JOIN esteira ON fkEsteira = idEsteira
WHERE visto = 0;



-- INSERTS PARA A APRESENTAÇÃO

-- Inserir empresas
INSERT INTO empresa (cnpj, telefone, nomeFantasia, isAtivo) VALUES
('12345678000101', '11987654321', 'Tech Solutions Ltda', 1),
('98765432000101', '21976543210', 'Alpha Tech', 1),
('11111111000111', '31965432109', 'Beta Enterprise', 1),
('22222222000222', '41954321098', 'Gamma Service', 1),
('33333333000333', '51943210987', 'Delta Logística', 1);

-- Inserir usuarios para cada empresa
INSERT INTO usuario (nome, email, senha, nivel, fkEmpresa) VALUES
('Carlos Silva', 'carlos.silva@techsolutions.com', 'senha123', 1, 1),
('Mariana Costa', 'mariana.costa@alphatech.com', 'senha123', 1, 2),
('João Almeida', 'joao.almeida@betaenterprise.com', 'senha123', 1, 3),
('Ana Santos', 'ana.santos@gamma.com', 'senha123', 1, 4),
('Lucas Pereira', 'lucas.pereira@deltalogistica.com', 'senha123', 1, 5);

-- Insert de funcionários para cada empresa
INSERT INTO usuario (nome, email, senha, dataCadastro, fkEmpresa)
VALUES
-- Usuários para Tech Solutions Ltda
('João Silva', 'joao.silva1@techsolutions.com', 'senha123', '2023-11-24 10:00:00', 1),
('Maria Oliveira', 'maria.oliveira1@techsolutions.com', 'senha123', '2023-11-25 11:00:00', 1),
('Carlos Pereira', 'carlos.pereira1@techsolutions.com', 'senha123', '2023-11-26 12:00:00', 1),
('Ana Souza', 'ana.souza1@techsolutions.com', 'senha123', '2023-11-27 13:00:00', 1),
('Pedro Costa', 'pedro.costa1@techsolutions.com', 'senha123', '2023-11-28 14:00:00', 1),
('Clara Lima', 'clara.lima1@techsolutions.com', 'senha123', '2023-11-29 15:00:00', 1),
('Lucas Rocha', 'lucas.rocha1@techsolutions.com', 'senha123', '2023-11-30 16:00:00', 1),
('Juliana Mendes', 'juliana.mendes1@techsolutions.com', 'senha123', '2023-11-24 17:00:00', 1),
('Fernando Santos', 'fernando.santos1@techsolutions.com', 'senha123', '2023-11-25 18:00:00', 1),
('Sofia Martins', 'sofia.martins1@techsolutions.com', 'senha123', '2023-11-26 19:00:00', 1),

-- Usuários para Alpha Tech
('João Silva', 'joao.silva2@alphatech.com', 'senha123', '2023-11-24 10:00:00', 2),
('Maria Oliveira', 'maria.oliveira2@alphatech.com', 'senha123', '2023-11-25 11:00:00', 2),
('Carlos Pereira', 'carlos.pereira2@alphatech.com', 'senha123', '2023-11-26 12:00:00', 2),
('Ana Souza', 'ana.souza2@alphatech.com', 'senha123', '2023-11-27 13:00:00', 2),
('Pedro Costa', 'pedro.costa2@alphatech.com', 'senha123', '2023-11-28 14:00:00', 2),
('Clara Lima', 'clara.lima2@alphatech.com', 'senha123', '2023-11-29 15:00:00', 2),
('Lucas Rocha', 'lucas.rocha2@alphatech.com', 'senha123', '2023-11-30 16:00:00', 2),
('Juliana Mendes', 'juliana.mendes2@alphatech.com', 'senha123', '2023-11-24 17:00:00', 2),
('Fernando Santos', 'fernando.santos2@alphatech.com', 'senha123', '2023-11-25 18:00:00', 2),
('Sofia Martins', 'sofia.martins2@alphatech.com', 'senha123', '2023-11-26 19:00:00', 2),

-- Usuários para Beta Enterprise
('João Silva', 'joao.silva3@betaenterprise.com', 'senha123', '2023-11-24 10:00:00', 3),
('Maria Oliveira', 'maria.oliveira3@betaenterprise.com', 'senha123', '2023-11-25 11:00:00', 3),
('Carlos Pereira', 'carlos.pereira3@betaenterprise.com', 'senha123', '2023-11-26 12:00:00', 3),
('Ana Souza', 'ana.souza3@betaenterprise.com', 'senha123', '2023-11-27 13:00:00', 3),
('Pedro Costa', 'pedro.costa3@betaenterprise.com', 'senha123', '2023-11-28 14:00:00', 3),
('Clara Lima', 'clara.lima3@betaenterprise.com', 'senha123', '2023-11-29 15:00:00', 3),
('Lucas Rocha', 'lucas.rocha3@betaenterprise.com', 'senha123', '2023-11-30 16:00:00', 3),
('Juliana Mendes', 'juliana.mendes3@betaenterprise.com', 'senha123', '2023-11-24 17:00:00', 3),
('Fernando Santos', 'fernando.santos3@betaenterprise.com', 'senha123', '2023-11-25 18:00:00', 3),
('Sofia Martins', 'sofia.martins3@betaenterprise.com', 'senha123', '2023-11-26 19:00:00', 3),

-- Usuários para Gamma Service
('João Silva', 'joao.silva4@gammaservice.com', 'senha123', '2023-11-24 10:00:00', 4),
('Maria Oliveira', 'maria.oliveira4@gammaservice.com', 'senha123', '2023-11-25 11:00:00', 4),
('Carlos Pereira', 'carlos.pereira4@gammaservice.com', 'senha123', '2023-11-26 12:00:00', 4),
('Ana Souza', 'ana.souza4@gammaservice.com', 'senha123', '2023-11-27 13:00:00', 4),
('Pedro Costa', 'pedro.costa4@gammaservice.com', 'senha123', '2023-11-28 14:00:00', 4),
('Clara Lima', 'clara.lima4@gammaservice.com', 'senha123', '2023-11-29 15:00:00', 4),
('Lucas Rocha', 'lucas.rocha4@gammaservice.com', 'senha123', '2023-11-30 16:00:00', 4),
('Juliana Mendes', 'juliana.mendes4@gammaservice.com', 'senha123', '2023-11-24 17:00:00', 4),
('Fernando Santos', 'fernando.santos4@gammaservice.com', 'senha123', '2023-11-25 18:00:00', 4),
('Sofia Martins', 'sofia.martins4@gammaservice.com', 'senha123', '2023-11-26 19:00:00', 4),

-- Usuários para Delta Logística
('João Silva', 'joao.silva5@deltalogistica.com', 'senha123', '2023-11-24 10:00:00', 5),
('Maria Oliveira', 'maria.oliveira5@deltalogistica.com', 'senha123', '2023-11-25 11:00:00', 5),
('Carlos Pereira', 'carlos.pereira5@deltalogistica.com', 'senha123', '2023-11-26 12:00:00', 5),
('Ana Souza', 'ana.souza5@deltalogistica.com', 'senha123', '2023-11-27 13:00:00', 5),
('Pedro Costa', 'pedro.costa5@deltalogistica.com', 'senha123', '2023-11-28 14:00:00', 5),
('Clara Lima', 'clara.lima5@deltalogistica.com', 'senha123', '2023-11-29 15:00:00', 5),
('Lucas Rocha', 'lucas.rocha5@deltalogistica.com', 'senha123', '2023-11-30 16:00:00', 5),
('Juliana Mendes', 'juliana.mendes5@deltalogistica.com', 'senha123', '2023-11-24 17:00:00', 5),
('Fernando Santos', 'fernando.santos5@deltalogistica.com', 'senha123', '2023-11-25 18:00:00', 5),
('Sofia Martins', 'sofia.martins5@deltalogistica.com', 'senha123', '2023-11-26 19:00:00', 5);




INSERT INTO usuario (nome, email, senha, nivel) VALUES
('Gabriel', 'gabriel@logistechsuporte.com', 'senha123', 2);
-- Inserir endereços para cada empresa
INSERT INTO endereco (cep, logradouro, cidade, UF, numero, complemento, fkEmpresa) VALUES
('12345678', 'Rua das Inovações, 101', 'São Paulo', 'SP', '101', 'Prédio A', 1),
('87654321', 'Avenida dos Engenheiros, 202', 'Rio de Janeiro', 'RJ', '202', 'Bloco B', 2),
('11112222', 'Rua das Consultorias, 303', 'Belo Horizonte', 'MG', '303', 'Sala 12', 3),
('22223333', 'Estrada da Alimentação, 404', 'Curitiba', 'PR', '404', 'Galpão 7', 4),
('33334444', 'Avenida da Logística, 505', 'Porto Alegre', 'RS', '505', 'Andar 2', 5);


-- Inserir esteiras para a empresa 1
INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES
('Esteira Mouse', 'Periféricos', 'Bloco A1', 20, 1),
('Esteira Teclado', 'Periféricos', 'Bloco A2', 25, 1),
('Esteira Monitor', 'Componentes', 'Bloco A3', 30, 1),
('Esteira Placa Mãe', 'Componentes', 'Bloco A4', 40, 1),
('Esteira Processador', 'Componentes', 'Bloco A5', 10, 1);

-- Inserir esteiras para a empresa 2
INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES
('Esteira Cabos USB', 'Acessórios', 'Bloco B1', 15, 2),
('Esteira HD Externo', 'Armazenamento', 'Bloco B2', 30, 2),
('Esteira SSD', 'Armazenamento', 'Bloco B3', 20, 2),
('Esteira Fonte', 'Componentes', 'Bloco B4', 35, 2),
('Esteira Memória RAM', 'Componentes', 'Bloco B5', 45, 2);

-- Inserir esteiras para a empresa 3
INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES
('Esteira Impressora', 'Periféricos', 'Bloco C1', 25, 3),
('Esteira Scanner', 'Periféricos', 'Bloco C2', 20, 3),
('Esteira Webcam', 'Periféricos', 'Bloco C3', 30, 3),
('Esteira Microfone', 'Áudio e Vídeo', 'Bloco C4', 35, 3),
('Esteira Caixa de Som', 'Áudio e Vídeo', 'Bloco C5', 50, 3);

-- Inserir esteiras para a empresa 4
INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES
('Esteira Joystick', 'Acessórios', 'Bloco D1', 15, 4),
('Esteira Controle', 'Acessórios', 'Bloco D2', 25, 4),
('Esteira Console', 'Periféricos', 'Bloco D3', 40, 4),
('Esteira Adaptador HDMI', 'Acessórios', 'Bloco D4', 20, 4),
('Esteira Gamepad', 'Acessórios', 'Bloco D5', 30, 4);

-- Inserir esteiras para a empresa 5
INSERT INTO esteira (nome, departamento, localizacao, distanciaEsperada, fkEmpresa) VALUES
('Esteira Projetor', 'Áudio e Vídeo', 'Bloco E1', 50, 5),
('Esteira Smart TV', 'Áudio e Vídeo', 'Bloco E2', 60, 5),
('Esteira Chromecast', 'Acessórios', 'Bloco E3', 40, 5),
('Esteira Soundbar', 'Áudio e Vídeo', 'Bloco E4', 35, 5),
('Esteira Subwoofer', 'Áudio e Vídeo', 'Bloco E5', 45, 5);

drop table metrica;
-- Inserir métricas para as esteiras com intervalos aleatórios
INSERT INTO metrica (nomeMetrica, valorMinimo, valorMaximo, cor, fkEsteira) VALUES
-- Esteira 1
('Crítico', 0, 40, 'FF0000', 1),
('Atenção', 41, 60, 'FFFF00', 1),
('Esperado', 61, 85, '00FFFF', 1),
('Ideal', 86, 100, '00FF00', 1),

-- Esteira 2
('Crítico', 0, 30, 'FF0000', 2),
('Atenção', 31, 55, 'FFFF00', 2),
('Esperado', 56, 75, '00FFFF', 2),
('Ideal', 76, 100, '00FF00', 2),

-- Esteira 3
('Crítico', 0, 35, 'FF0000', 3),
('Atenção', 36, 60, 'FFFF00', 3),
('Esperado', 61, 80, '00FFFF', 3),
('Ideal', 81, 100, '00FF00', 3),

-- Esteira 4
('Crítico', 0, 25, 'FF0000', 4),
('Atenção', 26, 50, 'FFFF00', 4),
('Esperado', 51, 70, '00FFFF', 4),
('Ideal', 71, 100, '00FF00', 4),

-- Esteira 5
('Crítico', 0, 20, 'FF0000', 5),
('Atenção', 21, 40, 'FFFF00', 5),
('Esperado', 41, 69, '00FFFF', 5),
('Ideal', 70, 100, '00FF00', 5),

-- Esteira 6
('Crítico', 0, 30, 'FF0000', 6),
('Atenção', 31, 50, 'FFFF00', 6),
('Esperado', 51, 75, '00FFFF', 6),
('Ideal', 76, 100, '00FF00', 6),

-- Esteira 7
('Crítico', 0, 45, 'FF0000', 7),
('Atenção', 46, 60, 'FFFF00', 7),
('Esperado', 61, 80, '00FFFF', 7),
('Ideal', 81, 100, '00FF00', 7),

-- Esteira 8
('Crítico', 0, 20, 'FF0000', 8),
('Atenção', 21, 50, 'FFFF00', 8),
('Esperado', 51, 70, '00FFFF', 8),
('Ideal', 71, 100, '00FF00', 8),

-- Esteira 9
('Crítico', 0, 15, 'FF0000', 9),
('Atenção', 16, 40, 'FFFF00', 9),
('Esperado', 41, 69, '00FFFF', 9),
('Ideal', 70, 100, '00FF00', 9),

-- Esteira 10
('Crítico', 0, 25, 'FF0000', 10),
('Atenção', 26, 55, 'FFFF00', 10),
('Esperado', 56, 79, '00FFFF', 10),
('Ideal', 80, 100, '00FF00', 10);
drop table metrica;


-- Inserir sensores para cada esteira
INSERT INTO sensor (dataInstalacao, ultimaManutencao, fkEsteira) VALUES
('2024-11-03', NULL, 1),
('2024-11-07', NULL, 2),
('2024-11-12', NULL, 3),
('2024-11-15', NULL, 4),
('2024-11-19', NULL, 5),
('2024-11-22', NULL, 6),
('2024-11-25', NULL, 7),
('2024-11-26', NULL, 8),
('2024-11-27', NULL, 9),
('2024-11-29', NULL, 10),
('2024-11-01', NULL, 11),
('2024-11-05', NULL, 12),
('2024-11-08', NULL, 13),
('2024-11-10', NULL, 14),
('2024-11-13', NULL, 15),
('2024-11-16', NULL, 16),
('2024-11-18', NULL, 17),
('2024-11-20', NULL, 18),
('2024-11-23', NULL, 19),
('2024-11-24', NULL, 20),
('2024-11-28', NULL, 21),
('2024-11-02', NULL, 22),
('2024-11-04', NULL, 23),
('2024-11-06', NULL, 24),
('2024-11-09', NULL, 25);


-- Sensor 1
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (20, 1, 1, '2024-11-27 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (22, 1, 1, '2024-11-27 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (18, 1, 1, '2024-11-28 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (25, 0, 1, '2024-11-28 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (30, 0, 1, '2024-11-29 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (19, 1, 1, '2024-11-29 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (21, 1, 1, '2024-11-30 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (35, 0, 1, '2024-11-30 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (23, 1, 1, '2024-12-01 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (40, 0, 1, '2024-12-01 09:00:00');

-- Sensor 2
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (25, 1, 2, '2024-12-02 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (26, 1, 2, '2024-12-02 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (24, 1, 2, '2024-12-03 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (20, 0, 2, '2024-12-03 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (27, 0, 2, '2024-11-27 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (23, 1, 2, '2024-11-27 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (25, 1, 2, '2024-11-28 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (28, 0, 2, '2024-11-28 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (30, 0, 2, '2024-11-29 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (29, 0, 2, '2024-11-29 09:00:00');

-- Sensor 3
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (30, 1, 3, '2024-11-30 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (32, 1, 3, '2024-11-30 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (28, 1, 3, '2024-12-01 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (35, 0, 3, '2024-12-01 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (40, 0, 3, '2024-12-02 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (29, 1, 3, '2024-12-02 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (31, 1, 3, '2024-12-03 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (38, 0, 3, '2024-12-03 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (34, 0, 3, '2024-11-27 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (33, 1, 3, '2024-11-27 09:00:00');

-- Os demais sensores seguem um padrão similar, ajustando os registros para os últimos 7 dias.
-- Sensor 4
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (40, 1, 4, '2024-11-27 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (38, 1, 4, '2024-11-27 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (42, 1, 4, '2024-11-28 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (45, 0, 4, '2024-11-28 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (50, 0, 4, '2024-11-29 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (39, 1, 4, '2024-11-29 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (41, 1, 4, '2024-11-30 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (48, 0, 4, '2024-11-30 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (43, 1, 4, '2024-12-01 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (47, 0, 4, '2024-12-01 09:00:00');

-- Sensor 5
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (50, 1, 5, '2024-12-02 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (48, 1, 5, '2024-12-02 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (52, 1, 5, '2024-12-03 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (55, 0, 5, '2024-12-03 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (60, 0, 5, '2024-11-27 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (49, 1, 5, '2024-11-27 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (51, 1, 5, '2024-11-28 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (58, 0, 5, '2024-11-28 09:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (53, 1, 5, '2024-11-29 08:00:00');
INSERT INTO registro (distancia, isProdutoViavel, fkSensor, dataRegistro) VALUES (57, 0, 5, '2024-11-29 09:00:00');