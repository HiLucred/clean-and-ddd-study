import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const newAnswer = makeAnswer({}, 'question-id')

    // Create 3 answer comments
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: newAnswer.id }),
      )
    }

    const result = await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.answerComments).toHaveLength(3)
    }
  })

  it('should be able to fetch paginated answer comments', async () => {
    const newAnswer = makeAnswer({}, 'question-id')

    // Create 23 answer comments
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: newAnswer.id }),
      )
    }

    const result = await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.answerComments).toHaveLength(3)
    }
  })
})
