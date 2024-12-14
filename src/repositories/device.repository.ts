import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Device, DeviceRelations} from '../models';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Device, dataSource);
  }
}
