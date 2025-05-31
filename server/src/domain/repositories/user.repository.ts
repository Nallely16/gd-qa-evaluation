import UserDto from "../dtos/user.dto";
import UserEntity from "../entities/user.entity";

export abstract class UserRepository {
    abstract registerOrUpdate(userDto: UserDto): Promise<UserEntity>;
}