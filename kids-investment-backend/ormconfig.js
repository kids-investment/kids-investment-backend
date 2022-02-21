var dbConfig = {}

switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: true,
    };
    break;
  case 'production':
    dbConfig = {
      type: 'postgres',
      //host: '/cloudsql/Instance connection name', //For google cloud-sql
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kids_investment',
      entities: ['**/*.entity.js'],
      synchronize: false //DO NOT SET TO TRUE IN PRODUCTION DB!
    };
    break;
  default:  
    throw new Error('Unknown Environment')
}

module.exports = dbConfig;