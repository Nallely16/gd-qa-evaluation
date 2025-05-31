import { UserSequelize } from "../../infraestructure/database/models/User";

export default class UserEntity {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null,
        public id?: number,
    ){}

    static fromRow(user: UserSequelize): UserEntity {
        return new UserEntity(
            user.username,
            user.email,
            user.password,
            user.createdAt,
            user.updatedAt,
            user.deletedAt,
            user.id
        );
    }
}