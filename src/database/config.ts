export const TypeOrmConfig: any = {
  type: 'mysql',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  cli: { migrationsDir: 'migration' },
  keepConnectionAlive: true,
  logging: 'true',
  synchronize: false,
  timezone: 'UTC',
  extra: {
    connectionLimit: 10,
  },
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 33062,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'dev',
}

console.log(process.env.DB_HOST)
