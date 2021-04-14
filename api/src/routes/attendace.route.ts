import { Router } from "express";
import AttendanceController from "../controllers/attendance.controller";
import Route from "../interfaces/routes.interface";

class AttendanceRoute implements Route {
    public path = '/attendance';
    public router = Router();
    public attendanceController = new AttendanceController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
    //   this.router.get(`${this.path}`, this.usersController.getUsers);
      this.router.post(`${this.path}/:id`, this.attendanceController.logAttendance);
      this.router.get(`${this.path}/:id`, this.attendanceController.getAttendance);
    }
  }
  
  export default AttendanceRoute;