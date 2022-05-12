export class MockRepository {
  public createQueryBuilder = jest.fn(() => this.queryBuilder)
  public repository = {
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: this.createQueryBuilder,
  }
  public getRepository = jest.fn(() => this.repository)
  public manager = { transaction: (a) => Promise.resolve(a()) }
  public metadata = {
    connection: {
      options: { type: null },
      getRepository: this.getRepository,
      createQueryBuilder: this.createQueryBuilder,
      transaction: (cb) => Promise.resolve(cb({ getRepository: this.getRepository })),
    },
    columns: [],
    relations: [],
  }
  public save = jest.fn()
  public delete = jest.fn()
  public update = jest.fn()
  public findOne = jest.fn()
  public findOneOrFail = jest.fn()
  public find = jest.fn()
  public getMany = jest.fn()
  public queryBuilder = {
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getCount: jest.fn(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  }
}
