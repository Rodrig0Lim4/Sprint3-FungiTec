var database = require("../database/config");

function buscarUltimasMedidas(fkSensor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        Temperatura as temperatura, 
        Umidade as umidade,  
        DiaHora,
                        FORMAT(DiaHora, 'HH:mm:ss') as momento_grafico
                    from Dados_Sensor
                    where fkSensor = ${fkSensor}
                    order by idDados_Sensor desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Temperatura as temperatura, 
        Umidade as umidade,
                        DATE_FORMAT(DiaHora,'%H:%i:%s') as momento_grafico, 
                        fkSensor 
                        from Dados_Sensor where fkSensor = ${fkSensor}
                    order by idDados_Sensor desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        Temperatura as temperatura, 
        Umidade as umidade,  
                        CONVERT(varchar, DiaHora, 108) as momento_grafico, 
                        fkSensor 
                        from Dados_Sensor where fkSensor = ${fkSensor} 
                    order by idDados_Sensor desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        Temperatura as temperatura, 
        Umidade as umidade,
                        DATE_FORMAT(DiaHora,'%H:%i:%s') as momento_grafico, 
                        fkSensor 
                        from Dados_Sensor where fkSensor = ${fkSensor}
                    order by idDados_Sensor desc limit 1;
                    `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
