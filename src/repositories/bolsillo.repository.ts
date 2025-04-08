import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Bolsillo, BolsilloRelations} from '../models';

export class BolsilloRepository extends DefaultCrudRepository<
  Bolsillo,
  typeof Bolsillo.prototype.id,
  BolsilloRelations
> {
  constructor(
    @inject('datasources.DB') dataSource: DbDataSource,
  ) {
    super(Bolsillo, dataSource);
  }
}
