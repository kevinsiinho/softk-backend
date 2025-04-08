import {Entity, model, property} from '@loopback/repository';

@model()
export class Bolsillo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nombre!: string;

  @property({
    type: 'number',
  })
  subtotal!: number;

  @property({
    type: 'number',
  })
  posicion: number;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'boolean',
  })
  Vinicial?: boolean;

  @property({
    type: 'number',
  })
  valor?: number;

  @property({
    type: 'date',
  })
  creado?: Date;

  @property({
    type: 'string',
  })
  idItem?: string;

  @property({
    type: 'string',
  })
  idCreador?: string;

  @property({
    type: 'boolean',
  })
  estado?: boolean;

  constructor(data?: Partial<Bolsillo>) {
    super(data);
  }
}

export interface BolsilloRelations {
  // describe navigational properties here
}

export type BolsilloWithRelations = Bolsillo & BolsilloRelations;
