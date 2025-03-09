import {Entity, model, property} from '@loopback/repository';

@model()
export class DisenoTarjeta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  colorfondo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCSS: string;


  constructor(data?: Partial<DisenoTarjeta>) {
    super(data);
  }
}

export interface DisenoTarjetaRelations {
  // describe navigational properties here
}

export type DisenoTarjetaWithRelations = DisenoTarjeta & DisenoTarjetaRelations;
