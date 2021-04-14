import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IUser } from '../interfaces';
import { TeacherEntity } from './teacher.entity';
import { StudentEntity } from './student.entity';
import { AttendanceEntity } from './attendance.entity';

@Entity("users")
@Unique(['email'])
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column({
    default: false
  })
  isActive: boolean;

  @OneToOne(() => TeacherEntity)
  @JoinColumn()
  teacher: TeacherEntity;

  @OneToOne(() => StudentEntity)
  @JoinColumn()
  student: StudentEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AttendanceEntity, attendance => attendance.user)
  attendance: AttendanceEntity[];
}
