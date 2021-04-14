import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ITeacher } from "../interfaces";

@Entity("teachers")
export class TeacherEntity implements ITeacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  employeeId: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}