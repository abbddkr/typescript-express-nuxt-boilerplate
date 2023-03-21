import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { CustomErrorException } from "../exceptions/CustomErrorException";
import { IAuthRequest } from "../interfaces/IAuthRequest";
import { IUser } from "../interfaces/IUser";
import UserServices from "../services/UserServices";
import ExpressMailer from "../config/expressmailer";

class AuthController {
  public userServices = new UserServices();
  public mailer = new ExpressMailer();

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: IUser = request.body;
      const validateAuth = await this.userServices.Authenticate(user);
      if (!validateAuth) {
        response
          .status(401)
          .json({ message: "Username/Password are incorrect!" });
      }

      response.setHeader("Set-Cookie", validateAuth["cookie"]);
      response.status(200).json({
        message: "Logged In Successfully",
        user: validateAuth["userInfo"],
        token: validateAuth["token"].token,
      });
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
  public register = async (
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
      user.role = request.body.role || "user";

      const errors = await validate(user);
      if (errors.length > 0) {
        response.status(401).json({ errors: errors });
      } else {
        const save: IUser = await AppDataSource.manager.save(user);
        // use confirm template
        response.status(200).json({ message: save });
      }
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * get logged in user info
   * @param request
   * @param response
   * @param next
   */
  public me = async (
    request: IAuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: IUser = request.user;
      response.status(200).json({ user: user });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * reset password
   * @param request
   * @param response
   * @param next
   */
  public reset = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findOne({ where: { email: request.body.email } });

      if (!user) {
        response.status(401).json({ error: "email is not found" });
      }

      this.mailer.sendMessage(
        "testing@gmail.com",
        request.body.email,
        "NodeMailer Testing | Reset Your Password",
        "Reset Your Password",
        "reset",
        { user }
      );
      response.status(200).json({ message: "we have sent you a link to reset your password, please check your inbox" });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };

  /**
   * log out
   * @param request
   * @param response
   * @param next
   */
  public logout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // response.setHeader('Set-Cookie', "[]")
      response.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      next(new CustomErrorException(error));
    }
  };
}

export default AuthController;
