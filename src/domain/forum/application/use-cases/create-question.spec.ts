import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question',() => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Shoud be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'fakeId',
      title: 'Título da pergunta',
      content: 'Conteúdo da pergunta...',
    })
  
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})

