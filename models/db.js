//Arquivo para conexão com Banco de Dados
//Chamando o 'sequelize', framework responsável para a conexão
const Seq = require('sequelize');
//Constante que chama a const acima, e passa os parâmetros para a conexão ao Banco
const seq = new Seq('hospital','root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
})

//Exportamos as constantes para ter as conexões lá no arquivo de campos
module.exports = {
    Seq: Seq,
    seq: seq
}

