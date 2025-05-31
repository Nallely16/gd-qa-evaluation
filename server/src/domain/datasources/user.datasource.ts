import UserDto from "../dtos/user.dto";
import UserEntity from "../entities/user.entity";

export default abstract class UserDatasource {
    abstract registerOrUpdate(userDto: UserDto): Promise<UserEntity>;
}