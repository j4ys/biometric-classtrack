import moment from "moment";
import { getRepository, IsNull, Not } from "typeorm";
import { AttendanceEntity } from "../entity/attendance.entity";
import { StudentEntity } from "../entity/student.entity";
import { TeacherEntity } from "../entity/teacher.entity";
import { UserEntity } from "../entity/users.entity";
import HttpException from "../exceptions/HttpException";
import { IUser } from "../interfaces";
import getTodaysTeacherSchedule from "../utils/teacherAttendance.schedule";
import { currentTimeInBetween } from "../utils/time.utils";

class AttendaceService {
    private users = UserEntity;
    private attendace = AttendanceEntity;
  
    public async logAttendace(userId: number): Promise<void> {
      const userRepository = getRepository(this.users);

      const user = await userRepository.findOne(userId, {
          relations: ['student', 'teacher']
      });
      if(!user) {
          throw new HttpException(400, `Invalid User Id(${userId})`);
      }

      if(user.teacher) {
          //log teachers attendace
          await this.logTeacherAttendace(user);
      }
      if(user.student) {
          //log student attendace
          await this.logStudentAttendance(user);
      }
    }

    public async getAttendanceForUser(userId: number) {
        const userRepo = getRepository(this.users);
        const user = await userRepo.findOne(userId);
        if(!user) {
            throw new HttpException(400, `Invalid User Id(${userId})`);
        }
        const attendaceRepo = getRepository(this.attendace);
        return attendaceRepo.find({
            where: {
                user: user 
            }
        });
    }

    private async logStudentAttendance(user: IUser) {
        const attendaceRepo = getRepository(this.attendace);
        const attendances = await this.getAttendanceForUser(user.id);
        let todaysAttendance = null
        if(attendances && attendances.length) {
            todaysAttendance = attendances.find(atd => {
                const today = moment();
                return atd.logout && moment(atd.login).startOf("day").isSame(today.startOf("day"));
            });
        }
        if(todaysAttendance) {
            throw new HttpException(400, "Attendance marked already");
        }

        const attendance = attendances.find(a => !a.logout);

        if(attendance) {
            attendance.logout = new Date();
            await attendaceRepo.update(attendance.id, attendance);
        }
        else {
            const newAttendance = new AttendanceEntity();
            newAttendance.login = moment().toDate();
            newAttendance.user = user;
            attendaceRepo.save(newAttendance);
        }
    }
    
    private async logTeacherAttendace(user: IUser) {
        const attendaceRepo = getRepository(this.attendace);
        const attendance = await attendaceRepo.findOne({
            where: {
                user: user,
                logout: IsNull()
            }
        });
        if(attendance) {
            attendance.logout = new Date();
            await attendaceRepo.update(attendance.id, attendance);
        }
        else {
            const newAttendance = new AttendanceEntity();
            //logic for if teacher has engaged class or not
            const schedule: any[]= getTodaysTeacherSchedule();
            if(schedule) {
                const currentClasses = schedule.filter(sch => {
                    return currentTimeInBetween(sch.checkInTime, sch.checkOutTime);
                });
                if(currentClasses && currentClasses.length) {
                    if(currentClasses[0].teacherId !== user.id) {
                        newAttendance.isEngaged = true; 
                    }
                }
                else {
                    newAttendance.isEngaged = true;
                }
            }
            newAttendance.login = moment().toDate();
            newAttendance.user = user;
            await attendaceRepo.save(newAttendance);
        }
    }
}

export default AttendaceService;