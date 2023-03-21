import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { IUser } from "../interfaces/IUser";
import { validate } from "class-validator";
import UserServices from "../services/UserServices";
import { plainToClass } from "class-transformer";
import { CustomErrorException } from "../exceptions/CustomErrorException";
import { IAuthRequest } from "../interfaces/IAuthRequest";

class UsersController {
  public userServices = new UserServices();

  /**
   * retrive all `Users`
   * @param req
   * @param res
   * @param next
   */
  public index = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userServices.getAllUsers();
      response.status(200).json({ message: users });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * store a new `User` in DB
   * @param req
   * @param res
   * @param next
   */
  public store = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = new User();
      user.email = request.body.email;
      user.firstName = request.body.firstName;
      user.lastName = request.body.lastName;
      user.username = request.body.username;
      user.password = request.body.password;

      const errors = await validate(user);

      if (errors.length > 0) {
        response.status(401).json({ message: errors });
      } else {
        const save: IUser = await AppDataSource.manager.save(user);
        response.status(200).json({ message: save });
      }
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * update an existing `User`
   * @param req
   * @param res
   * @param next
   */
  public update = async (
    request: IAuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(request.params.id);
      const updateData = plainToClass(User, { ...request.body, id: userId });
      const errors = await validate(updateData);
      const user: IUser = await AppDataSource.manager.save(updateData);
      if (errors.length > 0) {
        response.status(401).json({ message: errors });
      }
      response.status(200).json({ message: user });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * delete single `User`
   * @param request
   * @param response
   * @param next
   */
  public delete = async (
    request: IAuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(request.params.id);
      const del = await (
        await User
      ).delete(userId);
      response.status(200).json({ message: del });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * show a single `User`
   * @param req
   * @param res
   * @param next
   */
  public show = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(request.params.id);
      const user = await this.userServices.getUserById(userId);
      if (!user) {
        response.status(401).json({ message: `${userId} id Not Found!` });
      }

      response.status(200).json({ message: user });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };
}

export default UsersController;
