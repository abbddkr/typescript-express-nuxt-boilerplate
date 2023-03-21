import { IsDefined, IsString } from 'class-validator';

export class PostDto{
    public id: number

    @IsString()
    @IsDefined()
    public title: string

    @IsString()
    @IsDefined()
    public content: string
}
