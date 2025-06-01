import UserDto from "../../domain/dtos/user.dto";
import UserEntity from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import UserDatasourceImpl from "../datasources/user.datasource.impl";

export default class UserRepositoryImpl implements UserRepository {
    constructor(public readonly userDatasource: UserDatasourceImpl = new UserDatasourceImpl()){}

    public registerOrUpdate(userDto: UserDto): Promise<UserEntity> {
        return this.userDatasource.registerOrUpdate(userDto);
    }

    public getCredentials(email: string, password: string): Promise<UserEntity> {
        return this.userDatasource.getCredentials(email, password);
    }

    public changeUsername(newUsername: string, email: string): Promise<UserEntity> {
        return this.userDatasource.changeUsername(newUsername, email);
    }

    public updatePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
        return this.userDatasource.updatePassword(email, currentPassword, newPassword);
    }
}