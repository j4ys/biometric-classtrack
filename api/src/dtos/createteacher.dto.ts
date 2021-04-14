import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TeacherDto } from './teacher.dto';

export class CreateTeacherDto {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  teacher: TeacherDto;
}
