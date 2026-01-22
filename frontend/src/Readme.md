# 📊 Sistema de Controle de Residência - Gestão Financeira

Este projeto foi desenvolvido como uma solução full-stack para o gerenciamento de finanças residenciais, integrando um **Backend em .NET Core (C#)** com um **Frontend em React (TypeScript)**. O sistema permite o controle rigoroso de receitas e despesas vinculadas a pessoas e categorias específicas.

---

## 🛠️ Arquitetura Técnica

### **Backend (C# / .NET)**
* **Arquitetura em Camadas**: Implementação do padrão de separação entre `Controller` (entrada), `Service` (lógica de negócio) e `Repository/Context` (acesso a dados).
* **Integridade Referencial**: O banco de dados utiliza restrições de chave estrangeira para evitar a deleção de registros mestre (Pessoas/Categorias) enquanto houver transações vinculadas.
* **Injeção de Dependência**: Utilizada para promover o desacoplamento e a testabilidade dos serviços.

### **Frontend (React / TypeScript)**
* **Tipagem Estrita**: Uso de interfaces TypeScript para garantir a consistência dos dados financeiros e IDs entre as telas.
* **Comunicação em Tempo Real**: Uso de Axios com uma instância centralizada para chamadas assíncronas ao servidor.
* **Sincronização de Estado**: Atualização automática da interface após operações de exclusão ou cadastro para refletir o estado real do banco.

---

## ⚖️ Regras de Negócio e Requisitos do Exame

O sistema implementa as seguintes regras fundamentais:

1.  **Proteção de Menores (Receitas)**: O sistema impede o registro de "Receitas" para pessoas com idade inferior a 18 anos.
2.  **Validação de Categorias**: Transações são validadas para garantir que o tipo (Despesa/Receita) corresponda à finalidade da categoria selecionada.
3.  **Segurança de Exclusão**:
    * Uma **Pessoa** não pode ser removida se possuir transações em seu nome.
    * Uma **Categoria** não pode ser removida se houver lançamentos ativos vinculados a ela.
    * **Fluxo de Correção**: O usuário deve remover primeiro a transação específica para "desbloquear" a exclusão da entidade pai.

---

## 📈 Relatórios de Totais

A tela de **Consulta de Totais** oferece uma visão analítica do sistema:
* **Visão por Pessoa**: Lista receitas, despesas e o saldo individualizado.
* **Visão por Categoria**: Detalha o fluxo financeiro por finalidade (ex: Aposentadoria, Lazer).
* **Saldo Geral Consolidado**: Um rodapé dinâmico calcula o balanço líquido de todas as operações registradas no sistema.

---

## 🚀 Instruções de Execução

### **Servidor (Backend)**
1. Navegue até o diretório do projeto C#.
2. Execute o comando `dotnet ef database update` para configurar o banco.
3. Inicie o servidor com `dotnet run`.

### **Cliente (Frontend)**
1. Navegue até a pasta do React.
2. Instale as dependências com `npm install`.
3. Inicie a aplicação com `npm run dev`.