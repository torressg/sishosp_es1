//Criando uma constante chamando o arquivo que há a conexão com o banco
const db = require('./db')

//Constante para criar os campos da tabela 'medicos' | E para fazer a ligação do conteúdo do formulário com os campos respectivos
const medicos = db.seq.define('medicos', {
    nome: {
        type:db.Seq.STRING
    },
    sexo: {
        type:db.Seq.STRING
    },
    tpsangue: {
        type:db.Seq.STRING
    },
    datanasc: {
        type:db.Seq.DATE
    },
    telefone: {
        type:db.Seq.INTEGER
    },
    endereco: {
        type:db.Seq.STRING
    },
    codigomedico: {
        type:db.Seq.STRING
    },
    atuacao: {
        type:db.Seq.STRING
    }
})

const paciente = db.seq.define('pacientes', {
    nome: {
        type:db.Seq.STRING
    },
    sexo: {
        type:db.Seq.STRING
    },
    tpsangue: {
        type:db.Seq.STRING
    },
    datanasc: {
        type:db.Seq.DATE
    },
    telefone: {
        type:db.Seq.INTEGER
    },
    endereco: {
        type:db.Seq.STRING
    }
})

const atendimento = db.seq.define('atendimento', {
    paciente: {
        type:db.Seq.STRING
    },
    dataatend: {
        type: db.Seq.DATE,
    },
    medico: {
        type: db.Seq.STRING
    },
    ocorrido:{
        type: db.Seq.TEXT
    }
})

//Aqui só se roda esse código com essa linha abaixo uma vez, para a criação dos campos e tabela
    // medicos.sync({force:true})
    // paciente.sync({force:true})
    // atendimento.sync({force:true})

//Exportamos a constante dos campos das tabelas

module.exports = {
    medicos: medicos,
    paciente: paciente,
    atendimento: atendimento
}
