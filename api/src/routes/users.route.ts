import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { NewUserDto } from '../dtos/newUser.dto';
import { CreateTeacherDto } from '../dtos/createteacher.dto';
import { CreateStudentDto } from '../dtos/createstudent.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/teachers`, this.usersController.getAllTeachers);
    this.router.get(`${this.path}/students`, this.usersController.getAllStudents);
    this.router.get(`${this.path}/new`, this.usersController.getNewUserId);
    this.router.get(`${this.path}/:id`, this.usersController.getUserForId);
    this.router.post(`${this.path}`, validationMiddleware(NewUserDto, 'body'), this.usersController.createUser);
    this.router.post(`${this.path}/:id/confirm`, this.usersController.activateNewUser);
    this.router.post(`${this.path}/:id/teacher/new`, validationMiddleware(CreateTeacherDto, 'body'), this.usersController.createTeacher);
    this.router.post(`${this.path}/:id/student/new`, validationMiddleware(CreateStudentDto, 'body'), this.usersController.createStudent);
  }
}

export default UsersRoute;
