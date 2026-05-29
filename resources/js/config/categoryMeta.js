import { categories } from './questions.config.js'

export function getCategoryMeta(categoryId) {
  return categories.find((category) => category.id === categoryId) ?? categories[0]
}
