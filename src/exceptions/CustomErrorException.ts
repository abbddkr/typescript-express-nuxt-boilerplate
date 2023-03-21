export class CustomErrorException extends Error{
    public message: string;

    constructor(message: string){
        super(message)
        this.message = message;
    }
}
