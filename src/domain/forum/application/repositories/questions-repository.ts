import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
  findBySlug(questionSlug: string): Promise<Question | null>
  findManyRecent({ page }: PaginationParams): Promise<Question[] | null>
}
