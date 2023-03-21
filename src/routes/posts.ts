import { Router } from "express";
import PostsController from "../controllers/PostsController";
import { Routes } from "../interfaces/IRoutes";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

class Users implements Routes{
    public router = Router();
    public controller = new PostsController();

    constructor(){
        this.router.get('/api/posts',AuthMiddleware, this.controller.index)
        this.router.post('/api/posts',AuthMiddleware, this.controller.store)
        this.router.get('/api/posts/:id',AuthMiddleware, this.controller.show)
        this.router.post('/api/posts/:id',AuthMiddleware, this.controller.update)
        this.router.delete(`/api/posts/:id`,AuthMiddleware, this.controller.delete)

    }
}

export default Users;
