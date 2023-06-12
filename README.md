### FATEC - SJC
### Atividade 4 da matéria Programação de Scripts

Nessa atividade, foi desenvolvido uma aplicação para salvar em BD os nomes e as partidas dos times de futebol.

Aplicação foi criada utilizado TypeORM e Express para o backend, sendo hospedado em //hyperlink

Para persistência de dados foi utilizado o PostgresSQL, hospedado em //hyperlink

### API

O acesso ao backend é realizado através de uma API com as seguintes rotas:

#### Times
HTTP GET localhost:3004/team: retorna um array com os JSON de todos os times ordenados em ordem
ascendente de nome.

HTTP GET localhost:3004/team/termo: retorna um array com os JSON de todos os times que possuem no
nome o termo fornecido. O resultado deve ser ordenado em ordem ascendente de nome.

HTTP POST localhost:3004/team: persiste um registro na tabela teams do SGBD.

HTTP PUT localhost:3004/team: atualiza o nome do time. Exemplos de requisições:

HTTP DELETE localhost:3004/team: deleta um time da tabela teams do SGBD.

#### Partidas
HTTP POST localhost:3004/match: persiste um registro na tabela matches do SGBD. Exemplo de
requisição:

HTTP GET localhost:3004/match: retorna os registros da tabela matches do SGBD. O resultado é
apresentado em ordem decrescente de data. O resultado pode ser paginado usando os parâmetros limit e
offset.

HTTP GET localhost:3004/match/:id: retorna os registros da tabela matches que possuem o time como
visitante ou mandante. O resultado é apresentado em ordem decrescente de data.

HTTP PUT localhost:3004/match: atualiza os dados de um jogo na tabela matches do SGBD.

HTTP DELETE localhost:3004/match: deleta um jogo da tabela matches do SGBD.