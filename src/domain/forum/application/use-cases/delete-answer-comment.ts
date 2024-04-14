import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!questionComment) {
      throw new Error('Answer comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Now allowed')
    }

    await this.answerCommentsRepository.delete(questionComment)
  }
}
