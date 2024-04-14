import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to fetch question answers', async () => {
    const newQuestion = makeQuestion()

    // Create 3 answers
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({}, newQuestion.id.toString()),
      )
    }

    const { answers } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('Should be able to fetch paginated recent questions', async () => {
    const newQuestion = makeQuestion()

    // Create 23 questions
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({}, newQuestion.id.toString()),
      )
    }

    const { answers } = await sut.execute({
      questionId: newQuestion.id.toString(),
      page: 2,
    })

    expect(answers).toHaveLength(3)
  })
})
