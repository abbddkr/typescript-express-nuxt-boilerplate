export interface ITokenData{
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    id: number;
    username?: string;
    role?:string,
  }
