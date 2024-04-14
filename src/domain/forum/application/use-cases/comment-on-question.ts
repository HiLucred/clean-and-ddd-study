import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const questionComment = QuestionComment.create({
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(authorId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return { questionComment }
  }
}
