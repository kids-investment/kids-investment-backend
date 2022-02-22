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
      host: '/cloudsql/kids-investment:asia-east1:kids-investment',
      extra: {
        socketPath: '/cloudsql/kids-investment:asia-east1:kids-investment',
      },
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'web_backend',
      entities: ['**/*.entity.js'],
      synchronize: false //DO NOT SET TO TRUE IN PRODUCTION DB!
    };
    break;
  default:  
    throw new Error('Unknown Environment')
}

module.exports = dbConfig;