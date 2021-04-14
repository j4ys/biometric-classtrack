import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IUser } from "../interfaces";
import { IAttendace } from "../interfaces/attendance.interface";
import { UserEntity } from "./users.entity";

@Entity("attendance")
export class AttendanceEntity implements IAttendace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: Date;

  @Column({
    nullable: true
  })
  logout?: Date;

  @Column({
    default: false
  })
  isEngaged: boolean;

  @ManyToOne(() => UserEntity, user => user.attendance)
  user: IUser;
}