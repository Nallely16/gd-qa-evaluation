import UserDatasource from "../../domain/datasources/user.datasource";
import UserDto from "../../domain/dtos/user.dto";
import UserEntity from "../../domain/entities/user.entity";
import { CustomError } from "../../shared/errors/custom.error";
import { UserSequelize } from "../database/models/User";

export default class UserDatasourceImpl implements UserDatasource {
    async registerOrUpdate(userDto: UserDto): Promise<UserEntity> {
        try {
            const [userInstance] = await UserSequelize.upsert({
                username: userDto.username,
                email: userDto.email,
                password: userDto.password,
            })
            return UserEntity.fromRow(userInstance);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer()
        }
    }
}