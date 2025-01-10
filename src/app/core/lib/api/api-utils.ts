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

export const contentUrl = `/contents?${query}`

export function countComicsAmount<T>(struct: T): number {
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
