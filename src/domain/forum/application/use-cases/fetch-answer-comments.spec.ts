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

  it('Should be able to fetch answer comments', async () => {
    const newAnswer = makeAnswer({}, 'question-id')

    // Create 3 answer comments
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: newAnswer.id }),
      )
    }

    const { answerComments } = await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('Should be able to fetch paginated answer comments', async () => {
    const newAnswer = makeAnswer({}, 'question-id')

    // Create 23 answer comments
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: newAnswer.id }),
      )
    }

    const { answerComments } = await sut.execute({
      answerCommentId: newAnswer.id.toString(),
      page: 2,
    })

    expect(answerComments).toHaveLength(3)
  })
})
