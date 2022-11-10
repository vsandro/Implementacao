# IPCA
**Mestrado em Engenharia Informática**

Jorge Santos - 26831

Sandro Alves - 24460

**Sistemas de Computação na Cloud** 

Professor Miguel Lopes

## 1. Introdução

Aplicação de autenticação com microsserviços.

<p align='center'>
<img src='https://i.giphy.com/media/WOg7qdA8bRrWutWH9Z/giphy.gif' alt='gif animado'> 
</p>

## 2. Definições

### Objetivo

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Vestibulum mollis mauris et libero suscipit, non convallis nisl commodo. Aenean ut risus eros.
Aliquam blandit, orci vitae auctor fermentum.

Implementação de 2 microsserviços:

- Microsserviço de autenticação (authentication)

- Microsserviço de armazenamento de logs (log)


## 3. Tecnologias (Techs)

- NodeJs
- Banco de dados PostgreSQL
- Knex migrations
- Web Token (JWT)


## 4. Funcionalidades

- Login;
- Logout;
- CRUD users;


## 5. Instalação e execução.

- [Clone](https://help.github.com/articles/cloning-a-repository/) o projeto na sua máquina executando o seguinte comando no seu terminal:

```sh
git clone https://github.com/vsandro/Implementacao.git
```

**Banco de dados**

- Criação do banco de dados no PostgreSQL:

```sh
db_authentication
db_log
```

- Criação dos objetos do banco de dados no PostgreSQL:

```sh
cd log
npx prisma migrate dev
```

```sh
cd authentication
npx prisma migrate dev
```

**Backend**

- Instale as dependências do projeto com o comando:

```sh
cd log
npm install
```

```sh
cd authentication
npm install
```

- Rode o backend do projeto na sua máquina com:

```sh
cd log
npm run dev
```

```sh
cd authentication
npm run dev
```

**Frontend**

- Nulla cursus dignissim faucibus. Proin leo sapien, ultrices ut turpis nec, lobortis eleifend felis.

```sh
cd frontend
cursus dignissim faucibus
```


**Insomnia**

- Nulla cursus dignissim faucibus. Proin leo sapien, ultrices ut turpis nec, lobortis eleifend felis.

```sh
Authenticate - login
http://localhost:3000/user/login
```

```sh
Authenticate - logout
http://localhost:3000/user/logout
```

```sh
Authenticate - create user
http://localhost:3000/user
```

## 6. Autoria

Este projeto foi desenvolvido pelos alunos [Jorge Santos - 26831](https://www.linkedin.com/in/filipesantos1992) e [Sandro Alves - 24460](https://www.linkedin.com/in/vsandro) conforme requisitos definidos pelo professor e orientador Miguel Lopes na UC de Sistemas de Computação na Cloud.


