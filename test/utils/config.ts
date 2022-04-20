export const TypeOrmConfig: any = {
  type: 'sqlite',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  cli: { migrationsDir: 'migration' },
  keepConnectionAlive: true,
  logging: 'true',
  synchronize: true,
  timezone: 'UTC',
  extra: {
    connectionLimit: 10,
  },
  database: ':memory:',
}
