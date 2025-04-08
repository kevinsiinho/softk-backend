import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Deposito, DepositoRelations} from '../models';

export class DepositoRepository extends DefaultCrudRepository<
  Deposito,
  typeof Deposito.prototype.id,
  DepositoRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Deposito, dataSource);
  }
}
