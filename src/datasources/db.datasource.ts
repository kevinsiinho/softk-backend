import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbcuenta',
  connector: 'mongodb',
  url: 'mongodb+srv://kevinsiinho:rosa1045@cluster0.ybjbrep.mongodb.net/dbcuenta?retryWrites=true&w=majority',
  //url: 'mongodb://localhost:27017/dbcuenta',
  host: 'localhost',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
