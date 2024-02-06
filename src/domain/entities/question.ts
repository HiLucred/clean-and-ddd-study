import { Entity } from "../core/entities/entity"
import { UniqueEntityId } from "../core/entities/unique-entity-id"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updateAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(props: QuestionProps, id?: UniqueEntityId) {
    const question = new Question({ ...props, createdAt: new Date() }, id)
    return question
  }
}