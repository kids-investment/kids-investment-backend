var dbConfig = {
  // synchronize: false,
  // migrations: ['migrations/*.js'],
  // cli: {
  //   migrationsDir: 'migrations',
  // },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: true,
    });
    break;
  // case 'test':
  //   Object.assign(dbConfig, {
  //     type: 'sqlite',
  //     database: 'test.sqlite',
  //     entities: ['**/*.entity.ts']
  //   });
  //   break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      //host: '/cloudsql/Instance connection name', //For google cloud-sql
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kids_investment',
      entities: ['**/*.entity.js'],
      synchronize: true
    });
    break;
  default:  
    throw new Error('Unknown Environment')
}

module.exports = dbConfig;