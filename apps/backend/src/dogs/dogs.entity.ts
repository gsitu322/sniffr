import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;
}
