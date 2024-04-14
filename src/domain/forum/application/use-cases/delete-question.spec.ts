import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('shoud be able to delete a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('shoud not be able to delete a question from another user', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    expect(() => {
      return sut.execute({
        questionId: question.id.toString(),
        authorId: 'fake-author-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
