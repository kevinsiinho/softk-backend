import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {DisenoTarjeta, DisenoTarjetaRelations} from '../models';

export class DisenoTarjetaRepository extends DefaultCrudRepository<
  DisenoTarjeta,
  typeof DisenoTarjeta.prototype.id,
  DisenoTarjetaRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(DisenoTarjeta, dataSource);
  }
}
