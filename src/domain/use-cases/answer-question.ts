import { Answer } from "../entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"

interface AnswerQuestionUseCaseRequest {
  author: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ author, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ author, questionId, content })
    await this.answerRepository.create(answer)
    return answer
  }
}