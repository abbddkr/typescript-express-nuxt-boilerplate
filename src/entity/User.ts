import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, OneToMany, BaseEntity } from "typeorm"
import { IsEmail, IsIn, isString } from "class-validator"
import bcrypt from 'bcrypt';
import { Post } from "./Post";
import { IUser } from "../interfaces/IUser";

enum UserRole {
    Admin = 'admin',
    User = 'user',
}

@Entity('users')
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable:false })
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    @IsIn(['admin', 'user'])
    @Column('enum', { enum: UserRole, default: 'user' })
    role: UserRole

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    // safe response
    toJSON() {
        delete this.password;
        return this;
    }
}
