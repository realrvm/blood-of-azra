import { type AzraImage } from '@azra/core'
import * as qs from 'qs'

const query = qs.stringify(
  {
    populate: {
      books: {
        populate: {
          book: {
            populate: {
              chapters: {
                populate: {
                  comics: {
                    populate: {
                      image: {
                        fields: ['url'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const contentUrl = `/api/contents?${query}`

export function countImagesAmount<T>(struct: T): number {
  let amount = 0
  const stack = [struct]

  while (stack.length) {
    const pop = stack.pop()

    if (Array.isArray(pop)) {
      stack.push(...pop)
    }

    if (!Array.isArray(pop) && typeof pop === 'object') {
      for (const key in pop) {
        if (Array.isArray(pop[key]) && key === 'comics') {
          amount += pop[key].length
        }
        if (Array.isArray(pop[key]) && key !== 'comics') {
          stack.push(...pop[key])
        }
      }
    }
  }

  return amount
}

export function getRange(id = 1): number[] {
  if (id > 1) return [id - 1, id, id + 1, id + 2]

  return [3, 2, 1]
}

export function createContentStruct<T>(struct: T): AzraImage[] {
  const images: AzraImage[] = []
  const stack = [struct]

  while (stack.length) {
    const pop = stack.pop()

    if (Array.isArray(pop)) {
      stack.push(...pop)
    }

    if (!Array.isArray(pop) && typeof pop === 'object') {
      for (const key in pop) {
        if (Array.isArray(pop[key]) && key === 'comics') {
          const comics = pop[key]

          for (const comic of comics) {
            const { title, image } = comic
            images.push({ id: Number(title), url: image.url })
          }
        }
        if (Array.isArray(pop[key]) && key !== 'comics') {
          stack.push(...pop[key])
        }
      }
    }
  }

  return images
}
