import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, BaseEntity } from "typeorm"
import { IPost } from "../interfaces/IPost"
import { User } from "./User"

@Entity('posts')
export class Post extends BaseEntity implements IPost {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable:false })
    title: string

    @Column({ nullable:false })
    content: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToOne(() => User, (user) => user.posts)
    user: User | number

    @BeforeInsert()
    async modifyCreatedAt(){
        this.created_at = new Date();
    }

    @BeforeUpdate()
    async modifyUpdatedAt(){
        this.updated_at = new Date();
    }
}
