//Frameworks
//Chamando o 'express', framework para as rotas de acesso
const express = require("express");
//Aqui só trazemos a const de cima, para a const app para melhor desenv.
const app = express();
//Chamando o 'handlebars', framework para melhor gestão de Front-End
const handlebars = require("express-handlebars")
//Chamando o 'body-parser', framework que permite os dados do HTTP vierem para nosso sistema e ser tratado  no 'Post', para ir para o MySQL
const bodyParser = require("body-parser");
//Chamamos o arquivo 'Post' que criamos
const { medicos } = require("./models/Post");
const { paciente } = require("./models/Post");
const { atendimento } = require("./models/Post");
    // //Testando o select
    // const { medico } = require('./models/Post');
//Porta usada para acesso
const porta = 7000;

//Configuração
    //Template Engine - Front-End
      app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
      app.set('view engine', 'handlebars')
    //Body Parser
      app.use(bodyParser.urlencoded({extended: false}))
      app.use(bodyParser.json())

//Rotas

app.get('/inicio', function(req,res){
    res.render('./layouts/pageprincipal')
})

app.get('/cadastro/medico', function(req,res){
    res.render('./layouts/cadastromedico')
})
app.post('/sucesso/medico', function(req,res){
  medicos.create({
      nome: req.body.nome,
      sexo: req.body.sexo,
      tpsangue: req.body.tpsangue,
      datanasc: req.body.datanasc,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      codigomedico: req.body.crm,
      atuacao: req.body.atuacao,
  }).then(function(){
      res.render('./layouts/bemfeito')
  }).catch(function(erro){
      res.send("Houve um erro: " + erro)
  })
})


app.get('/cadastro/paciente', function(req,res){
  res.render('./layouts/cadastropaciente')
})
app.post('/sucesso/paciente', function(req,res){
  paciente.create({
      nome: req.body.nome,
      sexo: req.body.sexo,
      tpsangue: req.body.tpsangue,
      datanasc: req.body.datanasc,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
  }).then(function(){
      res.render('./layouts/bemfeito')
  }).catch(function(erro){
      res.send("Houve um erro: " + erro)
  })
})

app.get('/atendimento', async(req,res) => {
  const medico = await medicos.findAll();
  const pacientes = await paciente.findAll();
  res.render('./layouts/atendimento', { medico, pacientes })
})

app.post('/sucesso/atendimento', function(req,res){
  atendimento.create({
    paciente: req.body.paciente,
    dataatend: req.body.dataatend,
    medico: req.body.medico,
    ocorrido:req.body.ocorrido
  }).then(function(){
    res.render('./layouts/bemfeito')
}).catch(function(erro){
    res.send("Houve um erro: " + erro)
})
})



app.get('/consultas', async(req,res) => {
  const medico = await medicos.findAll();
  const pacientes = await paciente.findAll();
  const atendimentos = await atendimento.findAll();
    res.render('./layouts/consulta', { medico , pacientes , atendimentos })
})

app.get('/deletarmedico/:id', function(req,res){
  medicos.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('/consultas')
  })
})

app.get('/deletarpaciente/:id', function(req,res){
  paciente.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('/consultas')
  })
})

app.get('/deletaratendimento/:id', function(req,res){
  paciente.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('/consultas')
  })
})

//EDIT
app.get('/edit/medico/:id', function(req, res){
  medicos.findByPk(req.params.id)
    .then(post => {
      res.render('./layouts/form-edit-medico', {
        id: req.params.id,
        nome:post.nome,
        sexo:post.sexo,
        tpsangue: post.tpsangue,
        datanasc: post.datanasc,
        telefone: post.telefone,
        endereco: post.endereco,
        codigomedico: post.crm,
        atuacao: post.atuacao,
      })
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
})

app.post('/editado/medico/:id', function(req, res){
  medicos.update({
    nome:req.body.nome,
    sexo:req.body.sexo,
    tpsangue: req.body.tpsangue,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    codigomedico: req.body.crm,
    atuacao: req.body.atuacao,
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/inicio')
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/edit/atendimento/:id', function(req, res){
  atendimento.findByPk(req.params.id)
    .then(post => {
      res.render('./layouts/form-edit-atend', {
        id: req.params.id,
        paciente: post.paciente,
        dataatend: post.dataatend,
        medico: post.medico,
        ocorrido: post.ocorrido
      })
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
})

app.post('/editado/atendimento/:id', function(req, res){
  atendimento.update({
    paciente:req.body.paciente,
    dataatend:req.body.dataatend,
    medico: req.body.medico,
    ocorrido: req.body.ocorrido,
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/inicio')
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/edit/paciente/:id', function(req, res){
  paciente.findByPk(req.params.id)
    .then(post => {
      res.render('./layouts/form-edit-pac', {
        id: req.params.id,
        nome: post.nome,
        sexo: post.sexo,
        tpsangue: post.tpsangue,
        datanasc: post.datanasc,
        telefone: post.telefone,
        endereco: post.endereco,
      })
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
})

app.post('/editado/paciente/:id', function(req, res){
  paciente.update({
    nome:req.body.nome,
    sexo:req.body.sexo,
    tpsangue: req.body.tpsangue,
    datanasc: req.body.datanasc,
    telefone: req.body.telefone,
    endereco: req.body.endereco
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/inicio')
  }).catch(function(err){
    console.log(err);
  })
})

//Mensagem sobre porta acesso
app.listen(porta, function(){
    console.log("Acesse o link: http://localhost:" + porta + "/inicio")
});


