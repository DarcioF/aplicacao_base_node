
# API simples com Node js

## Requisitos

- Windows, Mac ou Linux
- Visual Studio Code

## Versões do Node

O Node normalmente é disponibilizado em duas versões, a Current que é a versão mais atual e a LTS que é a de suporte de longo tempo.
O LTS significa que esta é a versão mais estável que receberá suporte do time do Node até uma nova versão LTS.

## Instalação no Windows

A instalação do Node no Windows é relativamente simples, basta acessar o site oficial e fazer download do instalador. 
- https://nodejs.org/en/

- Execute o instalador, siga as instruções na tela e pronto, o Node está instalado e adicionado ao PATH do Windows.

## Mudando as políticas do Power Shell

Em alguns casos, durante a execução de comandos NPM no Windows, você poderá receber um erro com a seguinte mensagem: "O arquivo XXXX não pode ser carregado porque a execução de scripts foi desabilitada neste sistema"

Isto ocorre pois as políticas de execução do Power Shell em seu sistema não estão habilitada. Para resolver este problema, feche todos os terminais abertos e abra um novo Power Shell em modo administrador (Clicar com botão direito do mouse sobre o ícone do Power Shell e acessar a opção Executar como Administrador).

Nesta nova janela que se abriu, como administrador, execute o seguinte comando:

```cmd
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```
Feche novamente a janela e reabra o Power Shell ou qualquer terminal que esteja utilizando. Desta vez não precisa ser como administrador. O erro deve parar de acontecer.

## Instalação no Linux

No Linux podemos instalar o Node via apt, mas antes precisamos adicionar seu repositório com CURL.
```cmd
curl -sL https://deb.nodesource.com/setup\_16.x | sudo -E bash -
```
Note que adicionamos a versão 16.x do Node, caso haja uma versão superior, você pode alterar este valor. Em seguida vamos instalar o Node.

```cmd
sudo apt install nodejs
```
## Verificando a versão instalada

Sempre que estiver em dúvidas sobre a versão do Node instalada em sua máquina, você pode executar o comando abaixo em um terminal.

```cmd
node --version
```

## Instalando pacotes com NPM

O NPM é o gerenciador de pacotes do Node que vem junto em sua instalação. Para verificar a versão do NPM instalada, você pode executar o seguinte comando:

```cmd
npm --version
```

O Node apenas executa os scripts, enquanto o NPM é de onde baixamos os pacotes que desejamos utilizar.

- Por exemplo, se você precisa redimensionar uma imagem, você pode usar uma biblioteca já pronta, disponibilizada através do NPM.
- Isto acontece em outras tecnologias como o Nuget na Microsoft e o Dart Packages no Flutter.
- A maior diferença do NPM é que o Node em si não vem com nada "pronto", então quase tudo que utilizamos são pacotes.
- Os pacotes da nossa aplicação ficam armazenados na pasta NODE_MODULES, na raiz da mesma.


## Iniciando uma aplicação

Para dar início a nossa primeira aplicação, vamos abrir um novo terminal e executar os seguintes comandos:

```cmd
mkdir aplicacao_base  
cd aplicacao_base  
npm init -y
```

## Instalando pacotes locais

Vamos agora abrir nossa aplicação com o Visual Studio Code, e em seguida, abrir um terminal dentro dele.

```cmd
npm i express
```
O Express é um framework incrível e possui diversas características que facilitam o desenvolvimento de nossas aplicações. Dentre suas principais características, podemos citar:

- Possui um sistema de rotas completo;
- Possibilita o tratamento de exceções dentro da aplicação;
- Permite a integração de vários sistemas de templates que facilitam a criação de páginas web para suas aplicações;
- Gerencia diferentes requisições HTTP com seus mais diversos verbos;
- Feito para a criação rápida de aplicações utilizando um conjunto pequeno de arquivos e pastas;

## Criando nosso App

Vamos agora criar um arquivo chamado index.js na raiz da pasta aberta no Visual Studio Code com o seguinte conteúdo.

```javascript
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000);
```

Desta forma, abra um terminal e execute o comando:

```cmd
node index.js
```

## Consumindo os parâmetros de Query e Route

Existem três tipos de parâmetros, dois deles comumente utilizados no método GET e um no método no POST.

- Query Params (GET)
- Route Params (GET)
- Body Params (POST e PUT)
- Ainda no arquivo Index.js adicionamos as seguintes routes:

```javascript
//Query params
//Recebe os dados da requisição como parâmetro na URL.
//Caso de uso: Filtros para fazer consultas na aplicação.Pode conter um ou mais parâmetros:
// http://localhost:3000/hello?nome=Darcio&idade=21
// Query params = ?nome=Darcio&idade=21

app.get("/hello", (req, res) => {
  const { nome, idade } = req.query;

  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!?`,
    idade: idade
  });
});

//Route params
//Recebe os dados da requisição na rota.
//Caso de uso: Melhor maneira para buscar algo específico, deletar ou atualizar 
//usando o identificador único, por exemplo:
// http://localhost:3000/hello/Darcio
// Route params = /hello/:nome

app.get("/hello/:nome", (req, res) => {
  const { nome } = req.params;

  return res.json({
    title: "Hello World",
    message: `Olá ${nome} tudo bem!?`
  });
});

app.listen(3000);
```

## Principais ferramentas auxiliares

-O Insomnia é uma ferramenta cliente de API REST
 https://insomnia.rest/download

-O Nodemon é um utilitário de interface de linha de comando (CLI), que encapsula seu aplicativo Node, monitora o sistema de arquivos e reinicia o processo automaticamente.

```cmd
npm i nodemon
```
- logo após a instalação, agora para subir nossa API devemos utilizar o seguinte comando:

```cmd
npx nodemon index.js
```

## Criando um CRUD

No arquivo Index.js vamos adicionar uma lista de Customers(Clientes);

```javascript
let customers = [
  { id: 1, name: "IFPI", site: "https://www.ifpi.edu.br/" },
  { id: 2, name: "Google", site: "http://google.com" },
  { id: 3, name: "UOL", site: "http://uol.com.br" }
];
```
- Agora vamos adicionar algumas Routas:
- Routas para Listagem dos registros, retornando todos e apenas um registro.

```javascript
app.get("/customers", (req, res) => {
  return res.json(customers);
});

app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(item => item.id === id);
  const status = customer ? 200 : 404;
  return res.status(status).json(customer);
});
```
- Nessa etapa vamos fazer uma Inserção de um novo registros ver como utilizar uma routa utilizando o metodo PUT do HTTP
- Antes de adicionamos um Route do tipo PUT em nosso código devemos utiliar o express.json()  é um método embutido no expresso para reconhecer o objeto de solicitação recebido como um objeto JSON:

```javascript
app.use(express.json());
```

```javascript
app.post("/customers", (req, res) => {
  const { name, site } = req.body;
  const id = customers[customers.length - 1].id + 1;
  const newCustomer = { id, name, site };
  customers.push(newCustomer);
  return res.status(201).json(newCustomer);
});

```

- Vamos fazer um routa para alterar um registro a partir do id:

```javascript
app.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, site } = req.body;

  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers[index] = { id: parseInt(id), name, site };
  }

  return res.status(status).json(customers[index]);
});

```
- Na última etapa vamos fazer uma routa para exclusão de um registro:

```javascript
app.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  if (index >= 0) {
    customers.splice(index, 1);
  }

  return res.status(status).json();
});

```

Parabéns, você completou o primeiro passo em sua viagem com Nodejs!