import { Request, Response } from "express";
import AppDataSource from "../config/data-source";
import { User } from "../entity/User";
import { IUser } from "../interfaces/IUser";
import bcrypt from 'bcrypt';
import AuthAuxiliary from "../helpers/AuthAuxilary";
import { CustomErrorException } from "../exceptions/CustomErrorException";

class UserServices {

    public auxilary = new AuthAuxiliary();

    /**
     * validate authentication data
     * @param user
     * @returns User
     */
    public async Authenticate(user: IUser): Promise<false | { cookie: string, userInfo: User, token: string}> {
        try {
            const userInfo: User = await AppDataSource.manager.findOne(User, { 'where': { 'username': user.username }});
            const verifyHash = await bcrypt.compare(user.password, userInfo.password);
            if (!verifyHash || !userInfo) {
                return false;
            }

            const tokenData = this.auxilary.generateToken(userInfo);
            const cookie = this.auxilary.createCookie(tokenData);

            const token: any = tokenData;

            return { userInfo, cookie, token}
        } catch (error) {
            new CustomErrorException(error)
        }
    }

    public async getAllUsers(): Promise<User[]> {
        const users = await User.find();
        return users;
    }

    public async getUserById(userId: number): Promise<false | User> {
        const user = await User.findOne({ 'where': { 'id': userId } });
        if (!user) {
            return false
        }

        return user;
    }

}

export default UserServices;
