import { DataSource } from "typeorm";

//https://orkhan.gitbook.io/typeorm/docs/data-source-options
const AppDataSource = new DataSource({
    database: 'bdatividade', // se for SQLite, então use bdaula.db
    type: "postgres", // se for SQLite, então use sqlite
    url: 'postgres://revvgfql:Go3EW8mj1noZCHMBrUBU0FFXgP95GuZq@silly.db.elephantsql.com/revvgfql', // não use esta propriedade se for sqlite
    //port: 5432, // não use esta propriedade se for sqlite
    username: 'revvgfql', // não use esta propriedade se for sqlite
    password:'Go3EW8mj1noZCHMBrUBU0FFXgP95GuZq', // não use esta propriedade se for sqlite
    // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    // deixe false ao usar migrations
    synchronize: true, 
    logging: true, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.*"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"], // local onde estarão os arquivos de migração
});

// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default AppDataSource;