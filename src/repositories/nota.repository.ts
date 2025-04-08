import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Nota, NotaRelations} from '../models';

export class NotaRepository extends DefaultCrudRepository<
  Nota,
  typeof Nota.prototype.id,
  NotaRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Nota, dataSource);
  }
}
