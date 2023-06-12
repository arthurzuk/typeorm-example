### FATEC - SJC
### Atividade 4 da matéria Programação de Scripts

Nessa atividade, foi desenvolvido uma aplicação para salvar em BD os nomes e as partidas dos times de futebol.

Código base desse projeto disponiblizado publicamente pelo professor da matéria: https://github.com/arleysouza/typeorm-example.git;

Aplicação foi criada utilizado TypeORM e Express para o backend, sendo hospedado em https://atv4-app.onrender.com;

Para persistência de dados foi utilizado o PostgresSQL, hospedado em elephantsql.

### API

O acesso ao backend é realizado através de uma API com as seguintes rotas:

#### Times
HTTP GET https://atv4-app.onrender.com/team: retorna um array com os JSON de todos os times ordenados em ordem
ascendente de nome.

HTTP GET https://atv4-app.onrender.com/team/termo: retorna um array com os JSON de todos os times que possuem no
nome o termo fornecido. O resultado deve ser ordenado em ordem ascendente de nome.

HTTP POST https://atv4-app.onrender.com/team: persiste um registro na tabela teams do SGBD.

HTTP PUT https://atv4-app.onrender.com/team: atualiza o nome do time. Exemplos de requisições:

HTTP DELETE https://atv4-app.onrender.com/team: deleta um time da tabela teams do SGBD.

#### Partidas
HTTP POST https://atv4-app.onrender.com/match: persiste um registro na tabela matches do SGBD. Exemplo de
requisição:

HTTP GET https://atv4-app.onrender.com/match: retorna os registros da tabela matches do SGBD. O resultado é
apresentado em ordem decrescente de data. O resultado pode ser paginado usando os parâmetros limit e
offset.

HTTP GET https://atv4-app.onrender.com/match/:id: retorna os registros da tabela matches que possuem o time como
visitante ou mandante. O resultado é apresentado em ordem decrescente de data.

HTTP PUT https://atv4-app.onrender.com/match: atualiza os dados de um jogo na tabela matches do SGBD.

HTTP DELETE https://atv4-app.onrender.com/match: deleta um jogo da tabela matches do SGBD.