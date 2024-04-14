import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('shoud be able to edit a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const { question: updatedQuestion } = await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      title: 'Novo título',
      content: 'Novo conteúdo',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: updatedQuestion.title,
      content: updatedQuestion.content,
    })
  })

  it('shoud not be able to edit a question from another user', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    expect(() => {
      return sut.execute({
        questionId: question.id.toString(),
        authorId: 'fake-author-id',
        title: 'Novo título',
        content: 'Novo conteúdo',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
