import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const attachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: new UniqueEntityId(questionId),
      })
    })

    questionAttachmentList.update(attachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    return right({ question })
  }
}
