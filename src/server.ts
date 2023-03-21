import express from "express";
import 'dotenv/config';
import { Routes } from "./interfaces/IRoutes";
import { routes } from "./routes/routes";
import cookieParser from "cookie-parser";
import cors from 'cors';

class Server {
    public app: express.Application = express();
    public port: any = Number(process.env.SERVER_PORT);

    constructor(routes: Routes[])
    {
        this.config();
        this.initRoutes(routes);
    }

    public config()
    {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public serve()
    {
        this.app.listen(this.port,() => {
            console.log(`TS with express is working locally on the port:${this.port}`);
        });
    }

    private initRoutes(routes: Routes[])
    {
        routes.forEach((r) => {
            this.app.use('/', r.router);
        })
    }
}

let app = new Server(routes);
app.serve();
