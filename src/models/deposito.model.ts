import {Entity, model, property} from '@loopback/repository';

@model()
export class Deposito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
  })
  creado?: Date;

  @property({
    type: 'string',
  })
  fecha?: string;

  @property({
    type: 'string',
  })
  idBolsillo?: string;

  @property({
    type: 'string',
  })
  idItem!: string;

  @property({
    type: 'string',
  })
  idCreador?: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'number',
  })
  valor!: number;

  constructor(data?: Partial<Deposito>) {
    super(data);
  }
}

export interface DepositoRelations {
  // describe navigational properties here
}

export type DepositoWithRelations = Deposito & DepositoRelations;
