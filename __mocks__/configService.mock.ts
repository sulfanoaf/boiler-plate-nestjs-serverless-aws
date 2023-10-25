export class MockConfigService {

  public mysqlConfig = {
    host: 'localhost',
    database: 'template',
    username: 'root',
    password: '',
    port: 3306,
    type: 'mysql',
    logging: false,
  };

  get(param) {
    const config = {
      'boilerPlate.host': this.mysqlConfig.host,
      'boilerPlate.database': this.mysqlConfig.database,
      'boilerPlate.username': this.mysqlConfig.username,
      'boilerPlate.password': this.mysqlConfig.password,
      'boilerPlate.port': this.mysqlConfig.port,
      'boilerPlate.type': this.mysqlConfig.type,
      'boilerPlate.logging': this.mysqlConfig.logging,
    };

    return config[param];
  }
}
