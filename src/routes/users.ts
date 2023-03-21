import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { Routes } from "../interfaces/IRoutes";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

class Users implements Routes{
    public router = Router();
    public controller = new UsersController();

    constructor(){
        this.router.get('/api/users',AuthMiddleware, this.controller.index)
        this.router.post('/api/users',AuthMiddleware, this.controller.store)
        this.router.get(`/api/users/:id`,AuthMiddleware, this.controller.show)
        this.router.post(`/api/users/:id`,AuthMiddleware, this.controller.update)
        this.router.delete(`/api/users/:id`,AuthMiddleware, this.controller.delete)
    }
}

export default Users;
