import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('shoud be able to delete a answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({}, question.id.toString())

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('shoud not be able to delete a answer from another user', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({}, question.id.toString())

    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'fake-author-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
