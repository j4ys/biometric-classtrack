import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StudentDto } from './student.dto';

export class CreateStudentDto {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  student: StudentDto;
}
