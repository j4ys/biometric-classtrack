import { IUser } from "./users.interface";

export interface IAttendace {
    id: number;
    login: Date;
    logout?: Date;
    isEngaged: boolean;
    user: IUser;
}