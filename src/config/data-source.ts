import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import "dotenv/config";

/**
 * Read more: `https://typeorm.io/data-source-options`
 */
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
  entityPrefix: "enuxt_",
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized");
  })
  .catch((error) => console.log(error));

export default AppDataSource;
