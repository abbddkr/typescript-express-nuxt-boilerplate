import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Routes } from "../interfaces/IRoutes";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

class Auth implements Routes{
    public router = Router();
    public controller = new AuthController();

    constructor(){
        this.router.post('/api/login', this.controller.login)
        this.router.post('/api/register', this.controller.register)
        this.router.post('/api/reset', this.controller.reset)
        this.router.get('/api/me', AuthMiddleware, this.controller.me)
        this.router.post('/api/logout', AuthMiddleware, this.controller.logout)
    }
}

export default Auth;
