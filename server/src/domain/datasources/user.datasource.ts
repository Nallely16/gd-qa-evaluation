import UserDto from "../dtos/user.dto";
import UserEntity from "../entities/user.entity";

export default abstract class UserDatasource {
    abstract registerOrUpdate(userDto: UserDto): Promise<UserEntity>;
    abstract getCredentials(email: string, password: string): Promise<UserEntity>;
    abstract changeUsername(newUsername: string, email: string): Promise<UserEntity>;
    abstract updatePassword(email: string, currentPassword: string, newPassword: string): Promise<void>;
}