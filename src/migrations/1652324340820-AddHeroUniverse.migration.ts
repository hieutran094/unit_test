import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddHeroUniverse1652324340820 implements MigrationInterface {
  name = 'AddHeroUniverse1652324340820'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`hero\` ADD \`universe\` varchar(50) NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`hero\` DROP COLUMN \`universe\``)
  }
}
