import { type EntityTarget, type FindOptionsRelations, type FindOptionsWhere, type ObjectLiteral, type Repository } from 'typeorm'

import { appDataSource } from '@config/dataSource'

async function findEntity<Entity extends ObjectLiteral> (
  repository: EntityTarget<Entity>,
  criterias: FindOptionsWhere<Entity>,
  relations: FindOptionsRelations<Entity> | null = null
): Promise<Entity | null> {
  const entityRepository: Repository<Entity> = appDataSource.getRepository<Entity>(repository)
  return await entityRepository.findOneBy(criterias)
}

export { findEntity }
