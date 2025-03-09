import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User2} from './user2.model';

@model()
export class Item extends Entity {
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
  itemname: string;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'string',
  })
  fecha?: string;

  @property({
    type: 'date',
  })
  updated?: Date;

  @property({
    type: 'date',
  })
  reciente?: Date;

  @property({
    type: 'boolean',
  })
  estado?: boolean;

    @property({
    type: 'boolean',
  })
  favorito?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  icono?: string;

  @property({
    type: 'string',
  })
  colorLetra?: string;

  @property({
    type: 'string',
    required: true,
  })
  Idtarjeta: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreTarjeta: string;

  @property({
    type: 'string',
    required: false,
  })
  ColorFondo: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  tarjetas: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  compartir: object[];

  @belongsTo(() => User2)
  userId?: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
