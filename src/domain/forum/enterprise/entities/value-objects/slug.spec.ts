import { expect, it } from 'vitest'
import { Slug } from './slug'

it('shoud be able to create a new text from text', () => {
  const slug = Slug.createFromText('Example question title')
  expect(slug.value).toEqual('example-question-title')
})
