import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('Shoud be able to answer a question', async () => {
    const { answer } = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      content: 'Answer content...',
    })

    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
