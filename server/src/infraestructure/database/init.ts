import { UserSequelize } from "./models/User";

export const DbSequelize = async (): Promise<void> => {
    try {
        await UserSequelize.sync()

    } catch (error) {
        console.log(error)
        throw error;
    }
}
