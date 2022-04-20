import { Injectable } from '@nestjs/common'
import { Connection } from 'typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

@Injectable()
export class BaseService<T> extends TypeOrmCrudService<T> {
  protected connection: Connection
  constructor(protected repo: any) {
    super(repo)
    this.connection = this.repo.metadata.connection
  }
}
