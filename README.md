# DailyXP

> Sistema Full Stack de gamificação de hábitos desenvolvido com React, ASP.NET Core Web API e PostgreSQL.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-9-512BD4?logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7)
![GitHub Pages](https://img.shields.io/badge/Frontend-GitHub%20Pages-black)

---

# Preview

![Preview do projeto](./dailyxp.png)

---

# 🚀 Demonstração

**Aplicação**

[🌐 Acessar aplicação](https://phel-lip.github.io/dailyxp/)

**API**

[🔗 Acessar API](https://dailyxp-api.onrender.com/api/Habit)

---

# Sobre o Projeto

O **DailyXP** é uma aplicação Full Stack inspirada em sistemas de progressão presentes em jogos, utilizando conceitos de gamificação para transformar hábitos em uma experiência interativa.

O projeto foi desenvolvido utilizando **React** no Front-End, **ASP.NET Core Web API** no Back-End e **PostgreSQL** como banco de dados, permitindo comunicação entre cliente e servidor através de uma API REST.

Além da implementação da interface, o projeto demonstra organização em camadas, persistência de dados, arquitetura cliente-servidor e integração completa entre Front-End, Back-End e banco de dados.

---

# Arquitetura

```text
React (Frontend)
        │
        ▼
ASP.NET Core Web API
        │
        ▼
Entity Framework Core
        │
        ▼
PostgreSQL (Neon)
```

---

# Funcionalidades

- Cadastro de hábitos
- Atualização de progresso em três níveis (0%, 50% e 100%)
- Exclusão de hábitos
- Sistema de XP baseado no progresso dos hábitos
- Sistema de sequência diária (Streak)
- Histórico semanal
- Sistema de recompensas desbloqueáveis
- Persistência de dados em PostgreSQL
- API REST desenvolvida em ASP.NET Core
- Integração completa entre Front-End e Back-End

---

# Tecnologias Utilizadas

## Front-End

- React
- Vite
- CSS3

## Back-End

- ASP.NET Core Web API
- Entity Framework Core
- REST API

## Banco de Dados

- PostgreSQL
- Neon

## Deploy

- GitHub Pages
- Render

## Versionamento

- Git
- GitHub

---

# Estrutura do Projeto

```text
dailyxp/

├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── backend/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Migrations/
│   ├── Program.cs
│   └── AppDbContext.cs
│
└── README.md
```

---

# Como Executar Localmente

## Clone o repositório

```bash
git clone https://github.com/Phel-lip/dailyxp.git

cd dailyxp
```

---

## Front-End

```bash
cd frontend

npm install

npm run dev
```

---

## Back-End

```bash
cd backend

dotnet restore

dotnet ef database update

dotnet run
```

Configure a **Connection String** utilizando **User Secrets** ou variáveis de ambiente antes de executar a API.

---

# Aprendizados

Durante o desenvolvimento deste projeto foram aplicados conceitos como:

- Desenvolvimento Full Stack
- Consumo de APIs REST
- CRUD completo
- Entity Framework Core
- Migrations
- PostgreSQL
- Integração entre Front-End e Back-End
- Persistência de dados
- Deploy utilizando GitHub Pages e Render
- Configuração de variáveis de ambiente
- Organização de arquitetura em camadas
- Versionamento utilizando Git e GitHub

---

# Objetivo

Este projeto foi desenvolvido para consolidar conhecimentos em desenvolvimento Full Stack, aplicando conceitos modernos de arquitetura cliente-servidor, persistência de dados, integração entre aplicações e boas práticas de desenvolvimento.

Além da implementação da interface, a aplicação demonstra a construção de uma API REST, comunicação entre cliente e servidor, gerenciamento de banco de dados relacional e deploy de uma aplicação completa em ambiente de produção.

---

# Autor

**Thasso Holanda**

GitHub: [Phel-lip](https://github.com/Phel-lip)
