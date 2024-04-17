import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it.skip('shoud be able to edit a answer', async () => {
    const question = makeQuestion()
    const newAnswer = makeAnswer({}, question.id.toString())

    await inMemoryAnswersRepository.create(newAnswer)

    const answer = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'Novo conteúdo',
    })

    expect(inMemoryAnswersRepository.items[0].content).toEqual(answer.value)
  })

  it('shoud not be able to edit a answer from another user', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({}, newQuestion.id.toString())

    await inMemoryAnswersRepository.create(newAnswer)

    const answer = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'fake-author-id',
      content: 'New content...',
    })

    expect(answer.isLeft()).toEqual(true)
    expect(answer.value).toBeInstanceOf(NotAllowedError)
  })
})
