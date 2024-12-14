import {Entity, model, property} from '@loopback/repository';

@model()
export class Device extends Entity{
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  IdUser: string;

  @property({
    type: 'string',
    required: true,
  })
  manufacturer: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  platform: string;

  @property({
    type: 'string',
  })
  osVersion?: string;

  @property({
    type: 'string',
    required: true,
  })
  operatingSystem: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isVirtual: boolean;

  @property({
    type: 'string',
    required: true,
  })
  webViewVersion: string;

@property({
    type: 'string',
    required: true,
  })
  fecha: string;

  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;
