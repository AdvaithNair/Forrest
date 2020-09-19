import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { BUCKET_URL, USER_ROLES, USER_DRIVE_DEFAULTS } from '@app/common';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { default: '' })
  firstName: string;

  @Column('text', { default: '' })
  lastName: string;

  @Column('text')
  password: string;

  @Column('text', {
    default: `${BUCKET_URL}/uploads/profile-picture/Default.png`
  })
  imageURL: string;

  @Column('text', { nullable: true })
  facebook: string;

  @Column('text', { nullable: true })
  instagram: string;

  @Column('text', { nullable: true })
  twitter: string;

  @Column('text', { nullable: true })
  snapchat: string;

  @Column('text', { default: USER_ROLES.USER })
  role: string;

  @Column('int', { default: 0 })
  count: number;

  @Column('text', { default: USER_DRIVE_DEFAULTS.VEHICLE_TYPE })
  carType: string;

  @Column({ default: USER_DRIVE_DEFAULTS.AVERAGE_MPH_OVER_HIGHWAY })
  avgHighwayOver: number;

  @Column({ default: USER_DRIVE_DEFAULTS.AVERAGE_MPH_OVER_CITY })
  avgCityOver: number;

  @Column({ default: 0 })
  carbonSaved: number;
}
