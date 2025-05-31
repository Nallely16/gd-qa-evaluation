export default class UserDto {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public id?: number,
    ){}

    static create(object: {[key: string]: any}): [string?, UserDto?]{
        const {username, email, password, id} = object;

        const missingString = 'at the user structure';

        if(!username) return [`Missing username ${missingString}`];
        if(!email) return [`Missing email ${missingString}`];
        if(!password) return [`Missing password ${missingString}`];

        return [undefined, new UserDto(username, email, password, id)];
    }
}