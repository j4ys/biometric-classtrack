import { IStudent } from "./student.interface";
import { ITeacher } from "./teacher.interface";

export interface IUser {
  id: number;
  email: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  teacher: ITeacher;
  student: IStudent;
}
