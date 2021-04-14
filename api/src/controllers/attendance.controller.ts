import { NextFunction, Request, Response } from "express";
import AttendaceService from "../services/attendace.service";

class AttendanceController {
    public attendaceService = new AttendaceService();
  
    public logAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = Number(req.params.id);
        const users = await this.attendaceService.logAttendace(userId);
        res.status(200).json("success");
      }
      catch(error) {
        next(error);
      }
    }

    public getAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const userId = Number(req.params.id);
        const attendances = await this.attendaceService.getAttendanceForUser(userId);
        res.status(200).json(attendances);
      }
      catch(error) {
        next(error);
      }
    }
}

export default AttendanceController;