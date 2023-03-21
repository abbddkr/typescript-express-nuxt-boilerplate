import { Request } from "express";
import { IUser } from "./IUser";

export interface IAuthRequest extends Request{
    user: IUser
}
