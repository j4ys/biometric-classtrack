import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { IStudent } from "../interfaces";

@Entity("students")
export class StudentEntity implements IStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollmentNumber: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}