import { getRepository, IsNull, Not } from 'typeorm';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces';
import { UserEntity } from '../entity/users.entity';
import { isEmpty } from '../utils/util';
import { NewUserDto } from '../dtos/newUser.dto';
import { CreateTeacherDto } from '../dtos/createteacher.dto';
import { TeacherEntity } from '../entity/teacher.entity';
import { StudentEntity } from '../entity/student.entity';
import { CreateStudentDto } from '../dtos/createstudent.dto';
import { logger } from '../utils/logger';

class UserService {
  public users = UserEntity;
  public teachers = TeacherEntity;
  public students = StudentEntity;

  public async getAll(): Promise<IUser[]> {
    const userRepository = getRepository(this.users);
    const result = await userRepository.find({
      relations: ['student', 'teacher']
    });
    logger.info("success in get all users");
    return result;
  }

  public async getAllTeachers(): Promise<IUser[]> {
    console.log("get Teacheres");
    try {
     const userRepository = getRepository(this.users);
     console.log("this is user repo", userRepository);
     return await userRepository.find({
       relations: ['teacher'],
       where: {
         teacher: Not(IsNull())
       }
     });
    }
    catch(error) {
      logger.info("error in service:", error);
      console.log(error);
      return;
    }
  }

  public async getAllStudents(): Promise<IUser[]> {
    const userRepository = getRepository(this.users);
    return await userRepository.find({
      relations: ['student'],
      where: {
        student: Not(IsNull())
      }
    });
  }

  public async getUserDetails(userId: number): Promise<IUser> {
    const userRepository = getRepository(this.users);
    return await userRepository.findOne(userId, {
      relations: ['student', 'teacher']
    })
  }

  public async createUser(userData: NewUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const userRepository = getRepository(this.users);
    const findUser: IUser = await userRepository.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const createUserData: IUser = await userRepository.save({ ...userData });

    return createUserData;
  }

  public async getNewUser(): Promise<IUser> {
    const userRepository = getRepository(this.users);
    const newUser: IUser = await userRepository.findOne({where: {isActive: false }});
    return newUser;
  }

  public async activateNewUser(userId: number): Promise<IUser> {
    if(!userId) {
      throw new HttpException(400, "Invalid request");
    }
    const userRepository = getRepository(this.users);
    const findUser: IUser = await userRepository.findOne(userId);
    if(!findUser) {
      throw new HttpException(400, "No user with such Id");
    }
    findUser.isActive = true;
    const updatedUser = await userRepository.save(findUser);
    return updatedUser;
  }

  public async createNewTeacher(userId: number, createTeacherDto: CreateTeacherDto): Promise<IUser> {
    if(!createTeacherDto) {
      throw new HttpException(400, "Invalid request");
    }
    const userRepository = getRepository(this.users);
    const teacherRepository = getRepository(this.teachers);
    
    let teacherWithEmpId = await teacherRepository.findOne({employeeId: createTeacherDto.teacher.employeeId});
    if(teacherWithEmpId) {
      throw new HttpException(400, `Teacher already exist with employee Id(${teacherWithEmpId.id})`);
    } 

    const user: UserEntity = await userRepository.findOne(userId, {
      relations: ['student', 'teacher']
    });
    if(!user) {
      throw new HttpException(400, `Invalid user Id(${userId})`);
    }
    if(user.student) {
      throw new HttpException(400, `Invalid operation`);
    }

    const teacher: TeacherEntity = await teacherRepository.save(createTeacherDto.teacher);
    user.firstName = createTeacherDto.firstName;
    user.lastName = createTeacherDto.lastName;
    user.teacher = teacher;
    await userRepository.update(userId, user)
    return user;
  }

  public async createNewStudent(userId: number, createTeacherDto: CreateStudentDto): Promise<IUser> {
    if(!createTeacherDto) {
      throw new HttpException(400, "Invalid request");
    }
    const userRepository = getRepository(this.users);
    const studentRepository = getRepository(this.students);

    let studentwithEnrollment = await studentRepository.findOne({enrollmentNumber: createTeacherDto.student.enrollmentNumber});
    if(studentwithEnrollment) {
      throw new HttpException(400, `Teacher already exist with enrollment Number(${studentwithEnrollment.id})`);
    } 
    
    const user: UserEntity = await userRepository.findOne(userId, {
      relations: ['student', 'teacher']
    });
    if(!user) {
      throw new HttpException(400, `Invalid user Id(${userId})`);
    }
    if(user.teacher) {
      throw new HttpException(400, `Invalid operation`);
    }

    const student: StudentEntity= await studentRepository.save(createTeacherDto.student);
    user.firstName = createTeacherDto.firstName;
    user.lastName = createTeacherDto.lastName;
    user.student = student;
    await userRepository.update(userId, user)
    return user;
  }

}

export default UserService;
