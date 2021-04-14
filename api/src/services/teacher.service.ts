import { CreateTeacherDto } from "../dtos/createteacher.dto";
import { TeacherEntity } from "../entity/teacher.entity";
import { UserEntity } from "../entity/users.entity";
import { IUser } from "../interfaces";

class TeacherService {
    public user = UserEntity;
    public teacher = TeacherEntity;
  
    // public async createTeacher(teacherData: CreateTeacherDto): Promise<IUser> {
    //   if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");
  
    //   const userRepository = getRepository(this.users);
    //   const findUser: IUser = await userRepository.findOne({ where: { email: userData.email } });
    //   if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
  
    //   const createUserData: IUser = await userRepository.save({ ...userData });
  
    //   return createUserData;
    // }
}