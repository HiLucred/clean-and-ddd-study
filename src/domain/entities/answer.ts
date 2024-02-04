import { randomUUID } from "node:crypto"

interface AnswerProps {
  author: string
  questionId: string 
  content: string
}

export class Answer {
  public id: string
  public author: string
  public questionId: string
  public content: string

  constructor({ author, questionId, content }: AnswerProps, id?: string) {
    this.author = author
    this.questionId = questionId
    this.content = content
    this.id = id ?? randomUUID()
  }
}