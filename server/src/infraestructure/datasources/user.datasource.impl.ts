import UserDatasource from "../../domain/datasources/user.datasource";
import UserDto from "../../domain/dtos/user.dto";
import UserEntity from "../../domain/entities/user.entity";
import { CustomError } from "../../shared/errors/custom.error";
import { comparePassword, hashPassword } from "../../shared/utils";
import { UserSequelize } from "../database/models/User";

export default class UserDatasourceImpl implements UserDatasource {
    async registerOrUpdate(userDto: UserDto): Promise<UserEntity> {
        try {
            const hashedPassword = await hashPassword(userDto.password);
            const [userInstance] = await UserSequelize.upsert({
                uuid: crypto.randomUUID(),
                username: userDto.username,
                email: userDto.email,
                password: hashedPassword,
            })
            return UserEntity.fromRow(userInstance);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer()
        }
    }

    async getCredentials(email: string, password: string): Promise<UserEntity> {
        try {
            const userInstance = await UserSequelize.findOne({
                where: {
                    email
                },
            })
            if (!userInstance) {
                throw CustomError.unauthorized("Invalid userInstance.");
            }
            const isMatch = await comparePassword(password, userInstance?.password || '');
            if (!isMatch) {
                throw CustomError.unauthorized("Invalid password");
            }
            return UserEntity.fromRow(userInstance);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async changeUsername(newUsername: string, email: string): Promise<UserEntity> {
        try {
            const userInstance = await UserSequelize.findOne({
                where: { email }
            })

            if (!userInstance) throw CustomError.notFound("User not found.");

            userInstance.username = newUsername;
            await userInstance.save();

            return UserEntity.fromRow(userInstance);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async updatePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
        try {
            const userInstance = await UserSequelize.findOne({
                where: { email }
            })

            if (!userInstance) throw CustomError.notFound("User not found.");

            const isMatch = await comparePassword(currentPassword, userInstance.password || '');
            if (!isMatch) throw CustomError.unauthorized("Current password is incorrect.");

            userInstance.password = await hashPassword(newPassword);
            await userInstance.save();
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }
}