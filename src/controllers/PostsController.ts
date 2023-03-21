import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/data-source";
import { Post } from "../entity/Post";
import { CustomErrorException } from "../exceptions/CustomErrorException";
import { IAuthRequest } from "../interfaces/IAuthRequest";
import { IPost } from "../interfaces/IPost";
import PostServices from "../services/PostServices";
import { PostDto } from "../validations/PostsDto";

class PostsController {
  public postService = new PostServices();

  public index = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const posts = await this.postService.getAllPosts();
      if (!posts) {
        response.status(401).json({ message: "Something went wrong!" });
      }

      response.status(200).json({ posts: posts });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  public store = async (
    request: IAuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const post = new Post();
      post.title = request.body.title;
      post.content = request.body.content;
      post.user = request.user.id;

      const errors = await validate(post);
      if (errors.length > 0) {
        response.status(401).json({ errors: errors });
      } else {
        const save: IPost = await AppDataSource.manager.save(post);
        response.status(200).json({ message: save });
      }
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * update an existing `Post`
   * @param req
   * @param res
   * @param next
   */
  public update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const postId = Number(request.params.id);
      const updateData: PostDto = request.body
      const errors = await validate(updateData);
      if(errors.length > 0){
        console.log(errors)
      }
      const post: Post = await this.postService.updatePostById(postId,updateData)
      response.status(200).json({ post: post });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * delete single `Post`
   * @param request
   * @param response
   * @param next
   */
  public delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const postId = Number(request.params.id);
      const del = await (await Post).delete(postId);
      response.status(200).json({ message: del });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * show a single `Post`
   * @param request
   * @param response
   * @param next
   */
  public show = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const postId = Number(request.params.id);
      const post = await this.postService.getPostById(postId);
      if (!post) {
        response.status(401).json({ message: `${postId} id Not Found!` });
      }

      response.status(200).json({ post: post });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };
}

export default PostsController;
