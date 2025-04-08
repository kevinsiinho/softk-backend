import {Entity, model, property} from '@loopback/repository';

@model()
export class Nota extends Entity {
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
  titulo: string;

  @property({
    type: 'boolean',
  })
  favorito?: boolean;

  @property({
    type: 'string',
  })
  texto?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'date',
    required: true,
  })
  creado: string;

  @property({
    type: 'date',
  })
  update?: string;

  @property({
    type: 'date',
  })
  reciente?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  compartir?: object[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  items?: object[];


  constructor(data?: Partial<Nota>) {
    super(data);
  }
}

export interface NotaRelations {
  // describe navigational properties here
}

export type NotaWithRelations = Nota & NotaRelations;
