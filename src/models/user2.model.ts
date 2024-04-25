import {Entity, hasMany, model, property} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class User2 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  nickname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    estado: true,
  })
  estado?: string;

  @hasMany(() => Item)
  productos: Item[];


  constructor(data?: Partial<User2>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User2 & UserRelations;
