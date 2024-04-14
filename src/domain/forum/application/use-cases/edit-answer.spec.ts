import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('shoud be able to edit a answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({}, question.id.toString())

    await inMemoryAnswersRepository.create(answer)

    const { answer: updatedAnswer } = await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Novo conteúdo',
    })

    expect(inMemoryAnswersRepository.items[0].content).toEqual(
      updatedAnswer.content,
    )
  })

  it('shoud not be able to edit a answer from another user', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({}, question.id.toString())

    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'fake-author-id',
        content: 'New content...',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
