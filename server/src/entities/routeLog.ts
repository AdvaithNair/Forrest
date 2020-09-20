import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import User from './user';

@Entity()
export default class RouteLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column('text')
  route: string;

  @Column('text')
  carType: string;

  @Column()
  avgHighwayOver: number;

  @Column()
  avgCityOver: number;

  @Column()
  carbonSaved: number;

  @Column()
  estimatedDuration: number; // Minutes

  @Column('text')
  date: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => User, user => user.routeLogs)
  user: User;
}
