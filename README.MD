# App

Back-end volitivo

## Rfs (Requisitos Funcionais) - Funcionalidades da aplicação

- [x] Deve ser possível...
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil do usuário logado;
- [] Deve ser possível obter as perguntas
- [] Deve ser possível cadastrar uma uma banca;
- [] Deve ser possível cadastrar um orgão;
- [] Deve ser possível cadastrar uma prova
- [] Deve ser possível cadastrar uma questão;
- [] Deve ser possível cadastrar questões em lote (importar de um arquivo CSV);
- [] Deve ser possível obter o número de perguntas respondidas pelo usuário logado;
- [] Deve ser possível obter o número de perguntas acertadas pelo usuário logado;
- [] Deve ser possível obter o número de perguntas erradas pelo usuário logado;
- [] Deve ser possível obter o número de perguntas não respondidas pelo usuário logado;
- [] Deve ser possível obter o histórico de perguntas respondidas pelo usuário logado;
- [] Deve ser possível apenas o usuário com roles ADMIN cadastrar uma banca;
- [] Deve ser possível apenas o usuário com roles ADMIN cadastrar um orgão;
- [] Deve ser possível apenas o usuário com roles ADMIN cadastrar uma prova;
- [] Deve ser possível apenas o usuário com roles ADMIN cadastrar uma questão;
- [] Deve ser possível apenas o usuário com roles ADMIN cadastrar questões em lote
  (importar de um arquivo CSV);

## RNr (Regras de negócio) - Caminhos que cada funcionalidade pode seguir

- [x] O usuário não deve poder se cadastrar com um e-mail já existente;
- [] O usuário não deve poder responder uma questão que já foi respondida;
- [] A questão deve ter um número de identificação único (Código da questão) além do ID
- [] Ao importar um arquivo CSV, o sistema deve verificar se o arquivo está no formato
  correto;
- [] Ao importar um arquivo CSV, caso o arquivo contenha uma questão com o mesmo código
  da questão que já
  existe, o sistema deve ignorar a questão;
- [] Ao importar um arquivo CSV, caso o arquivo contenha uma questão, que alguns dos
  campos obrigatórios
  não estejam preenchidos, o sistema deve ignorar a questão;
- [] Ao importar um arquivo CSV, caso o arquivo contenha uma questão, que campos como banca, orgão e prova
  não existam, o sistema deve criar os registros;

## Rnrs (Requisitos Não Funcionais) - Requisitos técnicos que não afetam a funcionalidade da aplicação

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
## Rules

- ADMIN
  - Cadastrar uma banca
  - Cadastrar um orgão
  - Cadastrar uma prova
  - Cadastrar uma questão
  - Cadastrar questões em lote (importar de um arquivo CSV)
- USER
  - Responder uma questão
  - Obter o perfil do usuário logado
  - Obter as perguntas
  - Obter o número de perguntas respondidas pelo usuário logado
  - Obter o número de perguntas acertadas pelo usuário logado
  - Obter o número de perguntas erradas pelo usuário logado
  - Obter o número de perguntas não respondidas pelo usuário logado
  - Obter o histórico de perguntas respondidas pelo usuário logado

## Permissions

- 'user.editor' - Editar usuário
- 'user.viewer' - Visualizar usuário
- 'user.delete' - Deletar usuário
