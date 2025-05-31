export default class UserExternal {
    constructor(
        public username: string,
        public email: string,
        public password: string,
    ){}

    static map(object: {[key:string]:any}): UserExternal {
        const {username, email, password} = object;

        const missingString = 'at the user structure';

        if(!username) throw new Error(`Missing username ${missingString}`);
        if(!email) throw new Error(`Missing email ${missingString}`);
        if(!password) throw new Error(`Missing password ${missingString}`);

        return new UserExternal(username, email, password);
    }

    toJSON(){
        return {
            username: this.username,
            email: this.email,
            password: this.password,
        };
    }
}
