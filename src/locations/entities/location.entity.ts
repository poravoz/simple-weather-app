import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  long: number;
}