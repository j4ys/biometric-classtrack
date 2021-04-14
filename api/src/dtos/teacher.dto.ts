import { IsNotEmpty } from "class-validator";

export class TeacherDto {
    @IsNotEmpty()
    employeeId: string;
}