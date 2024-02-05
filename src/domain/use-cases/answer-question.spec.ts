import { expect, it } from 'vitest'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  create: async(answer: Answer): Promise<void> => {
    return
  }
}

it("Shoud be able to answer a question", async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)
  const response = await answerQuestionUseCase.execute({
    author: 'Gabriel',
    questionId: 'random-id',
    content: 'Conteúdo da pergunta...'
  })
  expect(response.content).toEqual('Conteúdo da pergunta...')
})