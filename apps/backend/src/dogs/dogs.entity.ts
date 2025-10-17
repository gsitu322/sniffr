import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sex: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  bio: string;

  @Column()
  image: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
