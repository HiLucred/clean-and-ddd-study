import { makeAnswer } from '@/test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'

let inMemoryAnswerComments: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerComments = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerComments)
  })

  it('shoud be able to comment on answer', async () => {
    const newAnswer = makeAnswer({}, 'question-id')

    const { answerComment } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-id',
      content: 'Answer comment content...',
    })

    await inMemoryAnswerComments.create(answerComment)

    expect(inMemoryAnswerComments.items[0]).toEqual(answerComment)
  })
})
