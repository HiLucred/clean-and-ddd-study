import { randomUUID } from "node:crypto"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  author: string
  title: string
  slug: Slug
  content: string
}

export class Question {
  public id: string
  public author: string
  public title: string
  public slug: Slug
  public content: string

  constructor({ author, title, slug, content }: QuestionProps, id?: string) {
    this.author = author
    this.title = title
    this.slug = slug
    this.content = content
    this.id = id ?? randomUUID()
  }
}