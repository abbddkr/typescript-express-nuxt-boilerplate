import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { verify } from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/ITokenData";
import AppDataSource from "../config/data-source";
import { User } from "../entity/User";
import { IAuthRequest } from "../interfaces/IAuthRequest";
import { IUser } from "../interfaces/IUser";
import { CustomErrorException } from "../exceptions/CustomErrorException";

export async function AuthMiddleware(
  request: IAuthRequest,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = !request.header("Authorization").includes("Bearer")
      ? request.header("Authorization")
      : request.header("Authorization").split("Bearer ")[1];
    if (auth) {
      const secret: string = process.env.SECRET_KEY;
      const verifyJWT = (await verify(auth, secret)) as DataStoredInToken;
      const userId = verifyJWT.id;
      const role: string = verifyJWT.role;
      const findUser: IUser = await AppDataSource.manager.findOne(User, {
        where: { id: userId },
      });
      if (findUser && role === findUser.role) {
        request.user = findUser;
        next();
      } else {
        next(new CustomErrorException("invalid token"));
      }
    } else {
      next(new CustomErrorException("You are not allowed to call this method"));
    }
  } catch (error) {
    next(new CustomErrorException(error));
  }
}
