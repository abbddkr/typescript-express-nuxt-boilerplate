import { User } from "../entity/User";
import { DataStoredInToken, ITokenData } from "../interfaces/ITokenData";
import "dotenv/config";
import { sign } from "jsonwebtoken";

class AuthAuxiliary {
    /**
     * generate token for logged in user
     * @param user
     * @returns
     */
    public generateToken(user: User): ITokenData {
        const dataStoredInToken: DataStoredInToken = {
            id: user.id,
            role: user.role,
        };
        const secret: string = process.env.SECRET_KEY;
        const expiresIn: number = 120 * 120;
        return { expiresIn, token: sign(dataStoredInToken, secret, { expiresIn }) };
    }

    public createCookie(tokenData: ITokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthAuxiliary;
