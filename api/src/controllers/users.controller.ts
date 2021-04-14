import { NextFunction, Request, Response } from 'express';
import { CreateStudentDto } from '../dtos/createstudent.dto';
import { CreateTeacherDto } from '../dtos/createteacher.dto';
import { NewUserDto } from '../dtos/newUser.dto';
import { TeacherDto } from '../dtos/teacher.dto';
import { IUser } from '../interfaces';
import UserService from '../services/users.service';
import { logger } from '../utils/logger';

class UsersController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info("Controller: get all users");
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    }
    catch(error) {
      next(error);
    }
  }

  public getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllStudents();
      res.status(200).json(users);
    }
    catch(error) {
      next(error);
    }
  }

  public getAllTeachers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info("Error Controller: get all teachers");
    try {
      const users = await this.userService.getAllTeachers();
      res.status(200).json(users);
    }
    catch(error) {
      next(error);
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: NewUserDto = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);

      res.status(201).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public getNewUserId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IUser =  await this.userService.getNewUser();
      if(userData) {
        res.status(200).json({id: userData.id});
      }
      else {
        res.status(200).json({id: 0});
      }
    }
    catch(error) {
      next(error);
    }
  }

  public activateNewUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: number = Number(req.params.id);
      const userData: IUser =  await this.userService.activateNewUser(userId);
      if(userData) {
        res.status(200).json(userData);
      }
    }
    catch(error) {
      next(error);
    }
  }


  public createTeacher = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const teacherDto: CreateTeacherDto = req.body;
    const userId: number = Number(req.params.id);

    try {
      await this.userService.createNewTeacher(userId, teacherDto);
      res.status(200).json({data: "updated successfully"});
    }
    catch(error) {
      next(error);
    }
  }

  public getUserForId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = Number(req.params.id);
    try {
      const user = await this.userService.getUserDetails(userId);
      res.status(200).json(user);
    }
    catch(error) {
      next(error);
    }
  }

  public createStudent = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const studentDto: CreateStudentDto = req.body;
    const userId: number = Number(req.params.id);

    try {
      await this.userService.createNewStudent(userId, studentDto);
      res.status(200).json({data: "updated successfully"});
    }
    catch(error) {
      next(error);
    }
  }
}

export default UsersController;
