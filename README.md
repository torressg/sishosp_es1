# Sistema Hospitalar

Aplicação WEB com CRUD, utlizando node.js e seus frameworks e APIs 

## Como utilizar
- Tenha Node.js instalado
- Tenha o MySql Server (CLI)
- Execute no PowerShell 'git clone https://github.com/torressg/sishosp_es1' onde deseja ter o projeto
- Abra o CMD, direcione para a pasta clonada e execute 'npm install'
- Abra o MySql CLI e crie a data base 'hospital'
- Abra o diretório na IDE de preferência (recomendo Vscode), vá na pasta models e abra o 'db.js', confira se está correto para você os parâmetros para conexão com o Banco de Dados
- Na mesma pasta models, abra o 'Post.js' retire o comentário da linha 69, 70 e 71
- Vá no CMD, se direcione a pasta 'sishosp_es1' clonada, e execute 'nodemon index.js', após criação das tabelas na data base, 'Ctrl+C' para finalizar o servidor
- Comente novamente as linhas 69, 70 e 71 no 'Post.js', vá no CMD, se direcione a pasta 'sishosp_es1' clonada, e execute 'nodemon index.js'
- A aplicação ficará no http://localhost:7000/inicio
